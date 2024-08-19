require('dotenv').config();
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const Message = require('./models/Message');
const app = require('./app');

const PORT = process.env.PORT || 3001;
const mongoUri = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET; 

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//const io = new Server(server);

const userIDToSocketID = {};
const io = new Server(server, {
  cors: {
      origin: "http://localhost:3000", // Update with your frontend URL
      methods: ["GET", "POST"],
      credentials: true,
  }
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token || socket.handshake.headers['authorization'];
  if (token) {
      jwt.verify(token, jwtSecret, (err, decoded) => {
          if (err) {
              return next(new Error('Authentication error'));
          }
          socket.user = decoded; // Attach the decoded user information to the socket
          
          userIDToSocketID[socket.user.id] = socket.id;

          
          next();
      });
  } else {
      next(new Error('Authentication error'));
  }
})

io.on('connection', (socket) => {
  console.log('A user connected:', socket.user, socket.id);

  // Handle incoming messages
  socket.on('sendMessage', async ({ receiverId, content }) => {

    // Save message to database
    const newMessage = new Message({
        senderId: socket.user.id,
        receiverId: receiverId,
        content: content,
    });

    await newMessage.save();

    let clientId = userIDToSocketID[receiverId];

    if(clientId) {
      io.to(clientId).emit('receiveMessage', {
        senderId: socket.user.id,
        content: content,
        timestamp: newMessage.timestamp,
      });
      console.log(`Message sent from ${socket.user.id} to ${receiverId}`);
    }
    // Emit message to both sender and receiver in the room
    
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.user.id, socket.id);
  });

});



