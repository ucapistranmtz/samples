// src/types/custom.d.ts
import { Request } from 'express';

export interface RequestWithTraceId extends Request {
  traceId?: string;
}
