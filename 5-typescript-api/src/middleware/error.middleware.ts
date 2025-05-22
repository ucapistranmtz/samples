import { Request, Response, NextFunction } from 'express';
import { getLogger } from '@utils/logger';

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  const logger = getLogger(req.traceId);
  logger.error(`[${req.traceId}][errorHandler] ${err.message}`);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
};
