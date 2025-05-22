import { Request, Response, NextFunction } from 'express';

export const addTraceIdToResponse = (req: Request, res: Response, next: NextFunction) => {
  if (req.traceId) {
    res.setHeader('X-Trace-Id', req.traceId);
  }
  next();
};
