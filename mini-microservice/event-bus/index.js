const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios
    .post('http://localhost:4000/events', event) // Posts
    .catch((err) => console.error(err.message));
  axios
    .post('http://localhost:4001/events', event) // Comments
    .catch((err) => console.error(err.message));
  axios
    .post('http://localhost:4002/events', event) // Queries
    .catch((err) => console.error(err.message));
  axios
    .post('http://localhost:4003/events', event) // Moderation
    .catch((err) => console.error(err.message));

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => console.log('Listening on 4005'));
