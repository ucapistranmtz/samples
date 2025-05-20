import { NextFunction, Response } from 'express';
import { RequestWithTraceId } from '../types/custom';

export const addTraceIdToResponse = (
  req: RequestWithTraceId,
  res: Response,
  next: NextFunction,
) => {
  if (req.traceId) {
    //setting the traceId to shared to the client so
    //any client could trace what we response
    res.setHeader('X-Trace-Id', req.traceId);
  }
  next();
};
