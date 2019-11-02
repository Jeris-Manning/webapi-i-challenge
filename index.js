// implement your API here

const express = require('express');
const db = require('./data/db.js');

const server = express();

server.listen(7777, () => {
  console.log('Server is listening on port 7777, yo!');
});

server.use(express.json());

server.get('/api/users', (req, res) => {
  db.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
        success: false
      });
    });
});
