import client, { Counter } from 'prom-client';
import { Request, Response, NextFunction } from 'express';

client.collectDefaultMetrics();

export const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    const userId = res.locals.userId || 'anonymous';

    userStatusCounter.labels(userId, res.statusCode.toString()).inc();

    httpRequestCounter
      .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
      .inc();
  });
  next();
};

export const getMetrics = async (): Promise<string> => {
  return await client.register.metrics();
};

export const userStatusCounter = new Counter({
  name: 'user_status_total',
  help: 'Number of responses by user ID and HTTP status code',
  labelNames: ['user_id', 'status_code'],
});
