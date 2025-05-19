import express from 'express';
import helmet from 'helmet';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

// middlewares
import { traceMiddleware } from './middleware/trace.middleware';
import { addTraceIdToResponse } from './middleware/response-header.middleware';


//load the environment variables
import './config/loadEnv';
import LoggerService from '@utils/logger';
import { startServer } from '@utils/start-server';


import rateLimit from 'express-rate-limit';
import { errorHandler } from './middleware/error.middleware';
import cors from 'cors';
import connectDb from './config/db';

const logger = LoggerService.getLogger();

// doing the app preparations
const app = express();

// Add traceId to all requests
app.use(traceMiddleware);

//  Attach traceId to all responses
app.use(addTraceIdToResponse);



// helmet is a middleware that helps to secure Express apps by setting various HTTP headers
// it helps to protect the app from well-known vulnerabilities by setting HTTP headers
// such as Content Security Policy, X-Content-Type-Options, X-Frame-Options, etc.
// it helps to prevent attacks such as cross-site scripting (XSS), clickjacking, and other code injection attacks
// it is a good practice to use helmet in production apps
// it is not necessary to use helmet in development mode
// but it is a good practice to use it in production mode
app.use(helmet());

// cors is a middleware that helps to enable Cross-Origin Resource Sharing (CORS)
// it allows the app to specify which origins are allowed to access the resources
// it is a security feature that restricts web pages from making requests to a different domain than the one that served the web page
// it is a good practice to use cors in production apps
// it is not necessary to use cors in development mode
// but it is a good practice to use it in production mode
/*
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 3600,
}));
*/

// Rate limiting middleware 

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
  headers: true
});
app.use(limiter);

// error handler middleware
// this middleware is used to handle errors that occur in the application
app.use(errorHandler)

//connecting to the database
connectDb();

 
// In express 5 we don't need to use body-parser middleware
// express has built-in middleware to parse JSON and urlencoded data
// body-parser is a middleware that helps to parse the request body
// it is used to parse the request body and make it available in req.body

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const swaggerPath = path.join(__dirname, './docs/swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/swagger.json', (_req, res) => {
  res.sendFile(swaggerPath);
});
 
const apiPort = parseInt(process.env.API_PORT || '3000', 10);

startServer(app, apiPort);
