/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSchemas, ValidationError } from 'types/custom';
import { ZodError } from 'zod';
import { getLogger } from '@utils/requestLogger';

export function validateSchemas(
  schemas: apiSchemas,
  data: { body?: any; query?: any; params?: any; headers?: any },
  traceId?: string,
): ValidationError[] {
  const log = getLogger(traceId);
  log.info(`[utils][validateSchemas] Validating schemas`);
  
  const validations: Array<{ location: string; error: ZodError }> = [];

  if (schemas.body) {
    const result = schemas.body.safeParse(data.body);
    if (!result.success) validations.push({ location: 'body', error: result.error });
  }

  if (schemas.query) {
    const result = schemas.query.safeParse(data.query);
    if (!result.success) validations.push({ location: 'query', error: result.error });
  }

  if (schemas.params) {
    const result = schemas.params.safeParse(data.params);
    if (!result.success) validations.push({ location: 'params', error: result.error });
  }

  if (schemas.headers) {
    const result = schemas.headers.safeParse(data.headers);
    if (!result.success) validations.push({ location: 'headers', error: result.error });
  }
  
  // all errors are in the same format
  return validations.flatMap((v) =>
    v.error.errors.map((detail) => ({
      location: v.location,
      field: detail.path.join('.'),
      message: detail.message,
    })),
  );
}
