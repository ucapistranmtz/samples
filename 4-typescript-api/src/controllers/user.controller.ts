// src/controllers/user.controller.ts
import {
  Controller, Route, Get, Post, Put, Delete, Tags, Path, Body, Response
} from 'tsoa';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from '../dtos/user.dto';
import { UserService } from '../services/user.service';
import { BaseController } from './base.controller';
import { getLogger } from '@utils/requestLogger';
import { Request } from 'express';


@Route('internal/users')
@Tags('Users')
export class UserController extends BaseController {
  private service = new UserService(this.getTraceId());
   /**
   * Get all users
   */
  @Get()
  public async getUsers(): Promise<UserResponseDto[]> {
    const logger = getLogger(this.getTraceId());
    logger.info('Fetching all users');
    return this.service.getAll();
  }

  /**
   * Get a user by ID
   * @param id User ID
   */
  @Get('{id}')
  @Response(404, 'User not found')
  public async getUser(@Path() id: string): Promise<UserResponseDto> {
    const logger = getLogger(this.getTraceId());
    logger.info(`Fetching user with ID: ${id}`);
    const user = await this.service.getById(id);
    if (!user) {
      this.setStatus(404);
      throw new Error('User not found');
    }
    return user;
  }

  /**
   * Create a new user
   * @param requestBody User data
   */
  @Post()
  @Response(201, 'User created')
  public async createUser(
    @Body() requestBody: CreateUserDto
  ): Promise<UserResponseDto> {
  // If you need to set a traceId, you should pass it as a parameter or handle it in middleware.
  // For now, we'll just log and create the user.
  const logger = getLogger(this.getTraceId());
  logger.info('Creating a new user');
  return this.service.create(requestBody);
  }

  /**
   * Update an existing user
   */
  @Put('{id}')
  @Response(404, 'User not found')
  public async updateUser(
    @Path() id: string,
    @Body() requestBody: UpdateUserDto
  ): Promise<UserResponseDto> {
    const logger = getLogger(this.getTraceId());
    logger.info(`Updating user with ID: ${id}`);
    return this.service.update(id, requestBody);
  }

  /**
   * Delete a user by ID
   */
  @Delete('{id}')
  @Response(204, 'User deleted')
  public async deleteUser(@Path() id: string): Promise<void> {
    const logger = getLogger(this.getTraceId());
    logger.info(`Deleting user with ID: ${id}`);
    return this.service.delete(id);
  }
}
