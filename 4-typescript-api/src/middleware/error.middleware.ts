import { Request, Response, NextFunction } from 'express';
import { getLogger } from '@utils/requestLogger'
import getErrorDetails from '@utils/errorUtils'

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const logger = getLogger(req.traceId);
  const details = getErrorDetails(err);

  logger.error(details);
  res.status(err.status || 500);
  res.json({
    message: err.message || 'Internal Server Error'
  });
}


export { errorHandler };