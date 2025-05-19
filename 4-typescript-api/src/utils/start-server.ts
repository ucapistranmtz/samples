import detectPort from 'detect-port';
import type { Express } from 'express';
import LoggerService from './logger';

const logger = LoggerService.getLogger();

export async function startServer(app: Express, requestedPort: number) {
  try {
    const availablePort = await detectPort(requestedPort);

    if (availablePort !== requestedPort) {
      logger.error(`❌ Port ${requestedPort} is already in use.`);
      logger.info(`👉 Try using a different port by updating .env or use API_PORT=${availablePort}`);
      process.exit(1);
    }

    app.listen(requestedPort, () => {
      logger.info(`🚀 App is running at http://localhost:${requestedPort}`);
    });
  } catch (err) {
    logger.error('⚠️ Failed to check port availability:', err);
    process.exit(1);
  }
}
