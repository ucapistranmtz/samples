const express = require('express');

const productRouter = express.Router();

productRouter.post('/', (req, res) => {
  //call the service => call the model
  res.status(201).send({ message: 'Product created' });
});

module.exports = productRouter;
