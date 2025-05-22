import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';

export const traceMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let traceId = req.headers['x-trace-id'] as string;
  if (!traceId) {
    traceId = uuidv4();
  }
  req.traceId = traceId;
  res.setHeader('X-Trace-Id', traceId);
  next();
};
