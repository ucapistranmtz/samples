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
  Request,
  Security
} from 'tsoa';
import { UserResponseDto, CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UserService } from '@services/user.service';
import { Request as ExpressRequest } from 'express';
import { getLogger } from '@utils/logger';
import { generateToken } from '@utils/jwt';

@Route('internal/users')
@Tags('Users')
export class UserController extends Controller {
  private service = new UserService();

  @Get()
  @Security('bearerAuth')
  public async getUsers(@Request() req: ExpressRequest): Promise<UserResponseDto[]> {
    const traceId = req.traceId || '';
    const log = getLogger(traceId);
    log.info('[userController][getUsers]');
    return this.service.getAll(traceId);
  }

  @Get('{id}')
  @Security('bearerAuth')
  public async getUser(@Path() id: string, @Request() req: ExpressRequest): Promise<UserResponseDto | null> {
    const traceId = req.traceId || '';
    const log = getLogger(traceId);
    log.info(`[userController][getUser] id=${id}`);
    return this.service.getById(id, traceId);
  }

  @Get('email/{email}')
  @Security('bearerAuth')
  public async getUserByEmail(@Path() email: string, @Request() req: ExpressRequest): Promise<UserResponseDto | null> {
    const traceId = req.traceId || '';
    const log = getLogger(traceId);
    log.info(`[userController][getUserByEmail] email=${email}`);
    return this.service.getByEmail(email, traceId);
  }

  @Post()
  public async createUser(@Body() body: CreateUserDto, @Request() req: ExpressRequest): Promise<{ token: string }> {
    const traceId = req.traceId || '';
    const log = getLogger(traceId);
    log.info('[userController][createUser] Creating user');
    const user = await this.service.create(body, traceId);
    const token = generateToken({ id: user.id, email: user.email, name: user.name });
    return { token };
  }

  @Put('{id}')
  @Security('bearerAuth')
  public async updateUser(
    @Path() id: string,
    @Body() body: UpdateUserDto,
    @Request() req: ExpressRequest
  ): Promise<UserResponseDto> {
    const traceId = req.traceId || '';
    const log = getLogger(traceId);
    log.info(`[userController][updateUser] id=${id}`);
    return this.service.update(id, body, traceId);
  }

  @Delete('{id}')
  @Security('bearerAuth')
  public async deleteUser(@Path() id: string, @Request() req: ExpressRequest): Promise<void> {
    const traceId = req.traceId || '';
    const log = getLogger(traceId);
    log.info(`[userController][deleteUser] id=${id}`);
    return this.service.delete(id, traceId);
  }
}
