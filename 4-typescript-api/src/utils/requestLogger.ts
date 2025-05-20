import LoggerService from './logger';

const logger = LoggerService.getLogger();

export const getLogger = (traceId?: string) => ({
  info: (msg: string) => logger.info(traceId ? { message: msg, traceId } : msg),
  error: (msg: string) => logger.error(traceId ? { message: msg, traceId } : msg),
  warn: (msg: string) => logger.warn(traceId ? { message: msg, traceId } : msg),
});
