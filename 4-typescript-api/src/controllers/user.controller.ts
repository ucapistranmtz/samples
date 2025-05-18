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

@Route('internal/users')
@Tags('Users')
export class UserController extends Controller {
  private service = new UserService();

  /**
   * Get all users
   */
  @Get()
  public async getUsers(): Promise<UserResponseDto[]> {
    return this.service.getAll();
  }

  /**
   * Get a user by ID
   * @param id User ID
   */
  @Get('{id}')
  @Response(404, 'User not found')
  public async getUser(@Path() id: string): Promise<UserResponseDto> {
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
    return this.service.update(id, requestBody);
  }

  /**
   * Delete a user by ID
   */
  @Delete('{id}')
  @Response(204, 'User deleted')
  public async deleteUser(@Path() id: string): Promise<void> {
    return this.service.delete(id);
  }
}
