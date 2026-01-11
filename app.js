const express = require('express');

const app = express();

const port = 8080;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from the server!', app: 'tours' });
});
app.post('/', (req, res) => {
  res.send({ message: 'POST', app: 'tours' });
});

app.listen(port, () => {
  // cb will be called as soon as the server start listening
  console.log(`App running at port ${port}`);
});
