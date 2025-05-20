// src/controllers/base.controller.ts
import { Controller } from 'tsoa';
import { Request } from 'express';
import { RequestWithTraceId } from '../types/custom';

export class BaseController extends Controller {
  protected getRequest<T = Request>(): T {
   
    // Provided at runtime by tsoa if "controllerContextType": "express"
    return {} as T;
  }
  protected getTraceId(): string {
    const req = this.getRequest<Request>();
    return req.traceId ?? 'unknown';
  }
}
