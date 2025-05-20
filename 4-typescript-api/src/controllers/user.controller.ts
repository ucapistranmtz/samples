/* eslint-disable @typescript-eslint/no-explicit-any */
// src/controllers/user.controller.ts
import { Get, Post, Route, Tags, Body, Request } from 'tsoa';
import { BaseController } from './base.controller'; 
 import { Request as ExpressRequest } from 'express';

@Route('internal/users')
@Tags('Users')
export class UserController extends BaseController {
@Get()
  public async getUsers(
    @Request() req: ExpressRequest // <-- This will now be injected!
  ): Promise<any[]> {
    const traceId = req.traceId ?? 'unknown';
    console.log('getUsers Trace ID:', traceId);
    return [{ traceId }];
  }

 
  @Post()
  public async createUser(
    @Body() body: any,
    @Request() req: ExpressRequest
  ): Promise<any> {
    const traceId = req.traceId ?? 'unknown';
    return { ...body, traceId };
  }
}
