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
  Security,
} from 'tsoa';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dtos/user.dto';
import { UserService } from '@services/user.service';
import { Request as ExpressRequest } from 'express';
import { getLogger } from '@utils/requestLogger';
import { validateSchemas } from '@utils/validate-schemas';
import { userSchema } from '@validations/user.schema';
import bcrypt from 'bcrypt';
import { generateToken } from '@utils/jwt';

@Route('internal/users')
@Tags('Users')
export class UserController extends Controller {
  private service = new UserService();
  /**
   * Get all users
   */
  @Get()
  @Security('bearerAuth')
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
  @Security('bearerAuth')
  public async getUser(
    @Path() id: string,
    @Request() req: ExpressRequest, // <-- This will now be injected!
  ): Promise<UserResponseDto | null> {
    let user: UserResponseDto | null = null;
    const traceId = req.traceId || ''; // Access the traceId from the request

    const log = getLogger(traceId);

    try {
      log.info(`[UserController][getUser] Fetching user with ID: ${id}`);
      user = await this.service.getById(id, traceId);
      if (!user) {
        //  this.setStatus(404);
        throw new Error('User not found');
      }
    } catch (error) {
      log.error(
        `[UserController][getUser] Error fetching user with ID: ${id} ${(error as Error).message}`,
      );
      this.setStatus(404);
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
  ): Promise<{ token: string }> {
    const traceId = req.traceId || ''; // Access the traceId from the request
    const log = getLogger(traceId);
    let token: string = '';
    try {
      log.info(
        `[UserController][createUser] Creating user with data: ${JSON.stringify(requestBody)}`,
      );

      const validationErrors = validateSchemas({ body: userSchema }, { body: req.body }, traceId);
      if (validationErrors.length > 0) {
        this.setStatus(400);
        throw new Error('Validation failed: ' + JSON.stringify(validationErrors));
      }

      const existing = await this.service.getByEmail(requestBody.email, traceId);
      if (existing) {
        this.setStatus(409);
        throw new Error('Email already exists');
      }

      const newUser = await this.service.create(requestBody, traceId);
      if (!newUser) {
        this.setStatus(500);
        throw new Error('User creation failed');
      }
      //new token
      log.info(`[UserController][createUser] User created: ${JSON.stringify(newUser)}`);
      token = generateToken({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      });
    } catch (error) {
      log.error(`[UserController][createUser] Error creating user: ${(error as Error).message}`);
      this.setStatus(500);
    }

    return { token };
  }

  /**
   * Update an existing user
   */
  @Put('{id}')
  @Response(404, 'User not found')
  @Security('bearerAuth')
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
  @Security('bearerAuth')
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
