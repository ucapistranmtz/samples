/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, NextFunction } from 'express';
import { RequestWithTraceId } from '../types/custom';
import { getLogger } from '@utils/requestLogger';
import getErrorDetails from '@utils/errorUtils';
import { userErrorsTotal } from '../metrics.errors';

/**
 * Express middleware for centralized error handling.
 *
 * Logs error details, tracks error metrics, and sends a standardized JSON error response.
 * Also increments a user-specific error counter for monitoring purposes.
 *
 * @param err - The error object thrown in the request pipeline.
 * @param req - The Express request object, extended with a traceId property.
 * @param res - The Express response object, with userId stored in res.locals.
 * @param next - The next middleware function in the Express stack.
 */
const errorHandler = (err: any, req: RequestWithTraceId, res: Response, next: NextFunction) => {
  const logger = getLogger(req.traceId);
  const details = getErrorDetails(err);

  logger.error(details);

  // Track error metrics
  const userId = res.locals.userId || 'anonymous';
  const errorType = err.name || 'UnknownError';
  userErrorsTotal.labels(userId, errorType).inc();

  res.status(err.status || 500);
  res.json({
    message: err.message || 'Internal Server Error',
  });
  next();
};

export { errorHandler };
