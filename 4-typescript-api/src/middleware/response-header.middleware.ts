import { Response, NextFunction } from 'express';
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
  // Intercept JSON responses to remove userId
  const originalJson = res.json;
  res.json = function (body: any) {
    if (body && typeof body === 'object' && 'userId' in body) {
      delete body.userId;
    }
    return originalJson.call(this, body);
  };
  next();
};
