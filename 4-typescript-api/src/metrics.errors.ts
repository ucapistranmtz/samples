import client from 'prom-client';

export const userErrorsTotal = new client.Counter({
  name: 'user_errors_total',
  help: 'Total number of errors by user and error type',
  labelNames: ['user_id', 'error_type'],
});

export const userSuccessTotal = new client.Counter({
  name: 'user_success_total',
  help: 'Total number of successful responses by user and route',
  labelNames: ['user_id', 'route'],
});
