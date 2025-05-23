// --- Success Metrics Middleware ---
// This middleware tracks successful API responses for Prometheus monitoring.
// It increments the 'user_success_total' counter for each response with status < 400,
// labeled by userId (from res.locals.userId) and route.
// This enables tracking of successful requests per user and route for analytics and troubleshooting.

import { Request, Response, NextFunction } from 'express';
import { userSuccessTotal } from '../metrics.errors';

export function successMetricsMiddleware(req: Request, res: Response, next: NextFunction) {
  res.on('finish', () => {
    if (res.statusCode < 400) {
      const userId = res.locals.userId || 'anonymous';
      const route = req.route?.path || req.path;
      userSuccessTotal.labels(userId, route).inc();
    }
  });
  next();
}
