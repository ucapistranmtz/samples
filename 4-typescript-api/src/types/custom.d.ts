// src/types/custom.d.ts
import { Request } from 'express';

export interface RequestWithTraceId extends Request {
  traceId?: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    traceId?: string;
  }
}