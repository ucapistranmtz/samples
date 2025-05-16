const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require ('./swagger');
const connectDB = require('./config/db');
const app = express();
const userRoutes = require('./routes/user.route');

connectDB();

app.use(express.json());
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));
app.use('/api/users', userRoutes);

app.listen(3000, () => console.log('Servidor en puerto 3000'));
