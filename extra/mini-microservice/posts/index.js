const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const posts = {};

app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios
    .post('http://event-bus-srv:4005/events', {
      type: 'PostCreated',
      data: {
        id,
        title,
      },
    })
    .catch((err) => console.error(err.message));

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Received Event', req.body);
  res.send({});
});

app.listen(4000, () => console.log('Listening on 4000'));
