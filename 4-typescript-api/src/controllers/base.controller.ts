// src/controllers/base.controller.ts
import { Controller } from 'tsoa';

export class BaseController extends Controller {
  protected traceId: string = 'unknown';

  public setTraceId(traceId: string) {
    this.traceId = traceId;
    this.setHeader('X-Trace-Id', traceId); // optional: return it to client
  }
  public getTraceId() {
    return this.traceId;
  }
}
