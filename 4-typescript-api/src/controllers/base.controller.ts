// src/controllers/base.controller.ts
import { Controller } from 'tsoa';
import { Request } from 'express';


export class BaseController extends Controller {
  protected traceId: string = 'unknown';

  public setTraceId(traceId: string) {
    const req = this.getRequest<Request>();

    this.traceId = traceId;
    this.setHeader('X-Trace-Id', traceId); // optional: return it to client
  }
  public getTraceId() {
    return this.traceId;
  }
}
