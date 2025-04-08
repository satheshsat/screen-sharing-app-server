const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
var cors = require('cors')

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: "*", // You can specify a specific origin here instead of '*'
      methods: ["GET", "POST"]
    }
  });

app.use(cors())
// Serve the static files (HTML, CSS, JS)
app.use(express.static('public'));

// When a user connects, set up their socket communication
io.on('connection', (socket) => {
  console.log('A user connected');

  // Broadcast the screen sharing stream to all other users
  socket.on('share-screen', (data) => {
    // Send screen data to all connected clients except the sender
    socket.broadcast.emit('screen-stream', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
