const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Store connected users
const connectedUsers = new Map();

// Mock bot responses
const botResponses = [
  "That's an interesting question! Let me think about that...",
  "I understand what you're asking. Here's what I think...",
  "Great question! Based on my knowledge, I would say...",
  "I'm here to help! Let me provide some insights on that...",
  "That's a fascinating topic. Here's my perspective...",
  "I appreciate you asking that. Here's what I can tell you...",
  "Let me break this down for you...",
  "That's a good point. Let me elaborate on that...",
  "I'm processing your question. Here's my response...",
  "Thanks for sharing that with me. Here's what I think..."
];

// Function to generate bot response
function generateBotResponse(userMessage) {
  const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
  const response = {
    id: Date.now(),
    text: randomResponse,
    sender: 'bot',
    timestamp: new Date().toISOString(),
    isTyping: false
  };
  return response;
}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Add user to connected users
  connectedUsers.set(socket.id, {
    id: socket.id,
    username: `User_${socket.id.slice(-4)}`
  });

  // Send welcome message
  socket.emit('message', {
    id: Date.now(),
    text: "Hello! I'm your AI assistant. How can I help you today?",
    sender: 'bot',
    timestamp: new Date().toISOString(),
    isTyping: false
  });

  // Handle incoming messages
  socket.on('sendMessage', (messageData) => {
    console.log('Received message:', messageData);
    
    // Broadcast the user message to all clients
    io.emit('message', {
      id: Date.now(),
      text: messageData.text,
      sender: 'user',
      timestamp: new Date().toISOString(),
      isTyping: false
    });

    // Simulate typing delay
    socket.emit('typing', { sender: 'bot', isTyping: true });
    
    setTimeout(() => {
      // Generate and send bot response
      const botResponse = generateBotResponse(messageData.text);
      socket.emit('typing', { sender: 'bot', isTyping: false });
      socket.emit('message', botResponse);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  });

  // Handle typing indicators
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    connectedUsers.delete(socket.id);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    connectedUsers: connectedUsers.size,
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
}); 