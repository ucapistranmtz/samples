/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types/custom.d.ts
import { Request } from 'express';
import { ZodSchema } from 'zod';

export interface RequestWithTraceId extends Request {
  traceId?: string;
}

export type apiSchemas = {
  body?: ZodSchema<any>;
  query?: ZodSchema<any>;
  params?: ZodSchema<any>;
  headers?: ZodSchema<any>;
};

export type ValidationError = {
  location: string;
  field: string;
  message: string;
};
