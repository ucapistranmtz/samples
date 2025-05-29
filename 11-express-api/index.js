const express = require('express');

const app = express();

app.get('/health', (req, res) => {
  res.status(200).send({ message: 'Api healthy' });
});
app.all('/health', (req, res) => {
  res.set('Allow', 'GET');
  res.status(405).send({ message: 'Not allowed method' });
});

app.listen(3000, () => {
  console.log('Api ready at http://localhost:3000/');
});
