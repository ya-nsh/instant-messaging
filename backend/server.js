const express = require('express');
const dotenv = require('dotenv');
const { chats } = require('./data/data');

const app = express();
dotenv.config(); // Loads environment variables from .env file

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/chat', (req, res) => {
  console.log(chats);
  res.send(chats);
});

app.get('/api/chat/:id', (req, res) => {
  console.log(req.params.id);
  const filteredChat = chats.filter(chat => chat._id === req.params.id);
  res.send(filteredChat);
});

app.listen(port, console.log(`listening on port ${port}`));
