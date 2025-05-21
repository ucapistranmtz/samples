// src/controllers/user.controller.ts
import {
  Controller,
  Route,
  Get,
  Post,
  Put,
  Delete,
  Tags,
  Path,
  Body,
  Response,
  Request,
} from 'tsoa';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dtos/user.dto';
import { UserService } from '@services/user.service';
import { Request as ExpressRequest } from 'express';
import { getLogger } from '@utils/requestLogger';
import { validateSchemas } from '@utils/validate-schemas';
import { userSchema } from '@validations/user.schema';

@Route('internal/users')
@Tags('Users')
export class UserController extends Controller {
  private service = new UserService();
  /**
   * Get all users
   */
  @Get()
  public async getUsers(
    @Request() req: ExpressRequest, // <-- This will now be injected!
  ): Promise<UserResponseDto[]> {
    const traceId = req.traceId || ''; // Access the traceId from the request
    const log = getLogger(req.traceId);
    log.info('[userController][getUsers]'); // Access the traceId from the request
    return this.service.getAll(traceId);
  }

  /**
   * Get a user by ID
   * @param id User ID
   */
  @Get('{id}')
  @Response(404, 'User not found')
  public async getUser(
    @Path() id: string,
    @Request() req: ExpressRequest, // <-- This will now be injected!
  ): Promise<UserResponseDto> {
    const traceId = req.traceId || ''; // Access the traceId from the request

    const log = getLogger(traceId);
    log.info(`[UserController][getUser] Fetching user with ID: ${id}`);
    const user = await this.service.getById(id, traceId);
    if (!user) {
      //  this.setStatus(404);
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
    @Body() requestBody: CreateUserDto,
    @Request() req: ExpressRequest, // <-- This will now be injected!
  ): Promise<UserResponseDto> {
    const traceId = req.traceId || ''; // Access the traceId from the request
    const log = getLogger(traceId);
    log.info(
      `[UserController][createUser] Creating user with data: ${JSON.stringify(requestBody)}`,
    );

    const validationErrors = validateSchemas({ body: userSchema }, { body: req.body }, traceId);
    if (validationErrors.length > 0) {
      this.setStatus(400);
      throw new Error('Validation failed: ' + JSON.stringify(validationErrors));
    }

    return this.service.create(requestBody, traceId);
  }

  /**
   * Update an existing user
   */
  @Put('{id}')
  @Response(404, 'User not found')
  public async updateUser(
    @Path() id: string,
    @Body() requestBody: UpdateUserDto,
    @Request() req: ExpressRequest, // <-- This will now be injected!
  ): Promise<UserResponseDto> {
    const traceId = req.traceId || ''; // Access the traceId from the request
    const log = getLogger(traceId);

    log.info(
      `[UserController][updateUser] Updating user with ID: ${id} and data: ${JSON.stringify(requestBody)}`,
    );

    const validationErrors = validateSchemas({ body: userSchema }, { body: req.body }, traceId);
    if (validationErrors.length > 0) {
      this.setStatus(400);
      throw new Error('Validation failed: ' + JSON.stringify(validationErrors));
    }

    return this.service.update(id, requestBody, traceId);
  }

  /**
   * Delete a user by ID
   */
  @Delete('{id}')
  @Response(204, 'User deleted')
  public async deleteUser(
    @Path() id: string,
    @Request() req: ExpressRequest, // <-- This will now be injected!
  ): Promise<void> {
    const traceId = req.traceId || ''; // Access the traceId from the request
    const log = getLogger(traceId);
    log.info(`[UserController][deleteUser] Deleting user with ID: ${id}`);
    return this.service.delete(id, traceId);
  }
}
