import LoggerService from './logger';

const logger = LoggerService.getLogger();


export const getLogger = (traceId?: string) => ({
  info: (msg: string) => logger.info({ message: msg, traceId }),
  error: (msg: string) => logger.error({ message: msg, traceId }),
  warn: (msg: string) => logger.warn({ message: msg, traceId }),
});
