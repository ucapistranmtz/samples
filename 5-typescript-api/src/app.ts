import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

import { traceMiddleware } from '@middleware/trace.middleware';
import { errorHandler } from '@middleware/error.middleware';
import { addTraceIdToResponse } from '@middleware/response-header.middleware';
import connectDb from '@config/db';
import { RegisterRoutes } from './routes/routes';

dotenv.config({ path: '.env.local' });

const app = express();

app.use(traceMiddleware);
app.use(addTraceIdToResponse);
app.use(helmet());
app.use(cors());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerPath = path.join(__dirname, './docs/swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/swagger.json', (_req, res) => res.sendFile(swaggerPath));

RegisterRoutes(app);

app.use(errorHandler);

connectDb().then(() => {
  const port = process.env.API_PORT || 3000;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API running on port ${port}`);
  });
});
