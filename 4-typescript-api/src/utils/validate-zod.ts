import { ZodSchema, ZodError } from 'zod';
import { getLogger } from '@utils/requestLogger';

export class ZodValidationError extends Error {
  public details: ReturnType<ZodError['format']>;
  constructor(message: string, details: ReturnType<ZodError['format']>) {
    super(message);
    this.name = 'ZodValidationError';
    this.details = details;
  }
}

/**
 * Validates request data using a Zod schema and logs with trace ID.
 * Use this inside a controller for Option A validation.
 */
export function validateZod<T>(
  schema: ZodSchema<T>,
  data: unknown,
  traceId: string = 'unknown',
): T {
  const logger = getLogger(traceId);
  const result = schema.safeParse(data);

  if (!result.success) {
    logger.error(`❌ Validation error: ${result.error.format()}`);
    throw new ZodValidationError('Validation failed', result.error.format());
  }

  return result.data;
}
