const express = require('express');
const dotenv = require('dotenv');
const { chats } = require('./data/data');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
app.use(express.json()); // for parsing application/json

dotenv.config(); // Loads environment variables from .env file
connectDB(); // Connects to MongoDB

const port = process.env.PORT || 5000;

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

app.use(notFound);
app.use(errorHandler);

app.get('/api/chat/:id', (req, res) => {
  console.log(req.params.id);
  const filteredChat = chats.filter(chat => chat._id === req.params.id);
  res.send(filteredChat);
});

const server = app.listen(port, console.log(`listening on port ${port}`));

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000'
  }
});

io.on('connection', socket => {
  console.log('Connected ' + socket.id);

  socket.on('setup', userData => {
    socket.join(userData._id);
    socket.emit('connected');
  });

  socket.on('join chat', room => {
    socket.join(room);
    console.log('User Joined Room: ' + room);
  });
  socket.on('typing', room => socket.in(room).emit('typing'));
  socket.on('stop typing', room => socket.in(room).emit('stop typing'));

  socket.on('new message', newMessageReceived => {
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log('chat.users not defined');

    chat.users.forEach(user => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit('message received', newMessageReceived);
    });
  });

  socket.off('setup', () => {
    console.log('USER DISCONNECTED');
    socket.leave(userData._id);
  });
});
