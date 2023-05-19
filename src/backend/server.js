const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Store connected clients
const clients = new Map();

const getSocketByUserId = (userId) => {
  let socket = {id: null};
  socket = clients.get(userId);
  return socket;
}
      
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('createSocket', function(user) {
    clients.set(user.userId, socket);
  });

  // Handle incoming messages from clients
  socket.on('sendMessage', (data) => {
    console.log("in send message")
    handleMessage(socket, data);
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    handleClientDisconnect(socket);
  });

  socket.on('addChatUser', function(userId) {
    clients.set(userId, socket);
  });

  socket.on('createRoom', function(data) {
    console.log("create room")
    socket.join(data.chatId);
    let withSocket = getSocketByUserId(data.withUserId);
    socket.broadcast.to(withSocket.id).emit("invite", { data })
  });

  socket.on('joinRoom', function(data) {
    console.log("join", data)
    socket.join(data.chatId);
  });
});

// Helper function to handle incoming messages
function handleMessage(socket, data) {
  console.log("sending message", data)
  socket.broadcast.to(data.chatId)
  socket.emit('message', {
    chatId: data.chatId, 
    author: data.user.companyName || data.user.firstname,
    message: data.message
  });
}

// Helper function to handle client disconnection
function handleClientDisconnect(socket) {
  let clientUserId = [...clients.entries()]
        .filter(({ 1: v }) => v.id === socket.id)
        .map(([k]) => k);
  clients.delete(clientUserId);
  console.log('Client disconnected');
}

// Start the server
const port = 3001;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
