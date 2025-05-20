import { createLogger, format, transports, Logger } from 'winston';

// I will use singleton pattern to create a logger instance
// this will ensure that there is only one instance of the logger in the application
// this will also ensure that the logger is created only once

class LoggerService {
  private static instance: Logger;

  public static getLogger(): Logger {
    if (!LoggerService.instance) {
      LoggerService.instance = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message, traceId }) => {
          return `${timestamp} [${level.toUpperCase()}] ${traceId ? `[TraceID: ${traceId}]` : ''} ${message}`;
        })
      ),
        transports: [
          new transports.Console(),
          // Add file logging if needed:
          // new transports.File({ filename: 'logs/app.log' }),
        ],
      });
    }

    return LoggerService.instance;
  }
}

export default LoggerService;
