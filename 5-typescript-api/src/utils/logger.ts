import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}] ${message}`)
  ),
  transports: [new transports.Console()]
});

export const getLogger = (traceId?: string) => ({
  info: (msg: string) => logger.info(traceId ? `[${traceId}] ${msg}` : msg),
  error: (msg: string) => logger.error(traceId ? `[${traceId}] ${msg}` : msg),
  warn: (msg: string) => logger.warn(traceId ? `[${traceId}] ${msg}` : msg)
});
