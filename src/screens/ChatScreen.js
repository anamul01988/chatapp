import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Appbar, FAB } from 'react-native-paper';
import { useChat } from '../context/ChatContext';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import TypingIndicator from '../components/TypingIndicator';
import { ChatIcons } from '../components/IconSet';

const ChatScreen = () => {
  const navigation = useNavigation();
  const {
    messages,
    currentChat,
    isConnected,
    isTyping,
    loadChats,
    createNewChat,
  } = useChat();
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    loadChats();
  }, []);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      // If no current chat, create a new one
      if (!currentChat) {
        createNewChat().then(() => {
          // Message will be sent after chat is created
        });
      }
      setInputText('');
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action
          icon={() => <ChatIcons.menu size={24} color="#000" />}
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content
          title={currentChat?.title || 'New Chat'}
          subtitle={isConnected ? 'Connected' : 'Disconnected'}
        />
        <Appbar.Action
          icon={() => <ChatIcons.add size={24} color="#000" />}
          onPress={createNewChat}
        />
      </Appbar.Header>

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.messageContainer}>
          <MessageList
            messages={messages}
            formatTimestamp={formatTimestamp}
          />
          {isTyping && <TypingIndicator />}
        </View>

        <MessageInput
          value={inputText}
          onChangeText={setInputText}
          onSend={handleSendMessage}
          disabled={!isConnected}
        />
      </KeyboardAvoidingView>

      {!currentChat && (
        <FAB
          style={styles.fab}
          icon={() => <ChatIcons.add size={24} color="#fff" />}
          onPress={createNewChat}
          label="New Chat"
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ffffff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
  },
});

export default ChatScreen; 