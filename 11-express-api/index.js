const express = require('express');
const routes = require('./controllers');

const app = express();
app.use(routes);
const port = process.env.PORT || 3001;

app.get('/health', (req, res) => {
  res.status(200).send({ message: 'You got a healthy API' });
});

app.all('/health', (req, res) => {
  res.set('Allow', 'GET');
  res.status(405).send({ message: 'Not allowed method' });
});

app.listen(port, (req, res) => {
  console.log(`Api ready at http://localhost:${port}`);
  console.log(`check the health endpoint at http://localhost:${port}/health`);
});
