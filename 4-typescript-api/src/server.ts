//load the environment variables
import './config/loadEnv';

import express from 'express';
import connectDb from './config/db'

// doing the server preparations
const server = express();
//connecting to the database
connectDb();

const apiPort = process.env.API_PORT || 3000;
server.use(express.json());
server.listen(apiPort, () => console.log(`server is running at port ${apiPort}`))
