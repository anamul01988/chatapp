import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const ChatContext = createContext();

const initialState = {
  messages: [],
  currentChat: null,
  chats: [],
  isConnected: false,
  isTyping: false,
  loading: false,
};

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_CURRENT_CHAT':
      return { ...state, currentChat: action.payload };
    case 'SET_CHATS':
      return { ...state, chats: action.payload };
    case 'ADD_CHAT':
      return { ...state, chats: [action.payload, ...state.chats] };
    case 'UPDATE_CHAT':
      return {
        ...state,
        chats: state.chats.map(chat =>
          chat.id === action.payload.id ? action.payload : chat
        ),
      };
    case 'SET_CONNECTION_STATUS':
      return { ...state, isConnected: action.payload };
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const socketRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    socketRef.current = io('http://localhost:3000');

    socketRef.current.on('connect', () => {
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: true });
    });

    socketRef.current.on('disconnect', () => {
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: false });
    });

    socketRef.current.on('message', (message) => {
      dispatch({ type: 'ADD_MESSAGE', payload: message });
    });

    socketRef.current.on('typing', (data) => {
      if (data.sender === 'bot') {
        dispatch({ type: 'SET_TYPING', payload: data.isTyping });
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Load chats from JSON server
  const loadChats = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.get('http://localhost:3001/chats');
      dispatch({ type: 'SET_CHATS', payload: response.data });
    } catch (error) {
      console.error('Error loading chats:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Create new chat
  const createNewChat = async () => {
    try {
      const newChat = {
        id: Date.now().toString(),
        title: 'New Chat',
        timestamp: new Date().toISOString(),
        messages: [],
      };

      const response = await axios.post('http://localhost:3001/chats', newChat);
      dispatch({ type: 'ADD_CHAT', payload: response.data });
      dispatch({ type: 'SET_CURRENT_CHAT', payload: response.data });
      dispatch({ type: 'SET_MESSAGES', payload: [] });
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  // Load chat by ID
  const loadChat = async (chatId) => {
    try {
      const response = await axios.get(`http://localhost:3001/chats/${chatId}`);
      dispatch({ type: 'SET_CURRENT_CHAT', payload: response.data });
      dispatch({ type: 'SET_MESSAGES', payload: response.data.messages || [] });
    } catch (error) {
      console.error('Error loading chat:', error);
    }
  };

  // Send message
  const sendMessage = (text) => {
    if (!socketRef.current || !text.trim()) return;

    const message = {
      id: Date.now(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_MESSAGE', payload: message });
    socketRef.current.emit('sendMessage', { text: text.trim() });

    // Update chat in JSON server
    if (state.currentChat) {
      const updatedChat = {
        ...state.currentChat,
        messages: [...state.messages, message],
        title: state.messages.length === 0 ? text.substring(0, 30) + '...' : state.currentChat.title,
      };
      
      axios.put(`http://localhost:3001/chats/${state.currentChat.id}`, updatedChat)
        .then(() => {
          dispatch({ type: 'UPDATE_CHAT', payload: updatedChat });
        })
        .catch(error => {
          console.error('Error updating chat:', error);
        });
    }
  };

  // Delete chat
  const deleteChat = async (chatId) => {
    try {
      await axios.delete(`http://localhost:3001/chats/${chatId}`);
      const updatedChats = state.chats.filter(chat => chat.id !== chatId);
      dispatch({ type: 'SET_CHATS', payload: updatedChats });
      
      if (state.currentChat?.id === chatId) {
        dispatch({ type: 'SET_CURRENT_CHAT', payload: null });
        dispatch({ type: 'SET_MESSAGES', payload: [] });
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const value = {
    ...state,
    loadChats,
    createNewChat,
    loadChat,
    sendMessage,
    deleteChat,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}; 