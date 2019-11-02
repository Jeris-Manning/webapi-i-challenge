// implement your API here

const express = require('express');
const db = require('./data/db.js');

const server = express();

server.listen(7777, () => {
  console.log('Server is listening on port 7777, yo!');
});

server.use(express.json());

// GETS ALL USERS

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

// GETS SPECIFIC USER BY ID

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;

  db.findById(id).then((user) => {
    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res
        .status(404)
        .json({ success: false, message: `No user with id ${id} in system.` });
    }
  });
});

// ADDS A NEW USER TO THE DATABASE

server.post('/api/users', (req, res) => {
  const user = req.body;

  db.insert(user)
    .then((entry) => {
      if (user.name && user.bio) {
        res.status(201).json({ success: true, user });
      } else {
        res
          .status(400)
          .json({
            success: false,
            errorMessage: 'Please provide name and bio for the user.'
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: 'There was an error while saving the user to the database'
      });
    });
});
