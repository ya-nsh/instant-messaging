const express = require('express');
const dotenv = require('dotenv');
const { chats } = require('./data/data');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json()); // for parsing application/json

dotenv.config(); // Loads environment variables from .env file
connectDB(); // Connects to MongoDB

const port = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.get('/api/chat', (req, res) => {
//   console.log(chats);
//   res.send(chats);
// });

app.use('/api/user', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.get('/api/chat/:id', (req, res) => {
  console.log(req.params.id);
  const filteredChat = chats.filter(chat => chat._id === req.params.id);
  res.send(filteredChat);
});

app.listen(port, console.log(`listening on port ${port}`));
