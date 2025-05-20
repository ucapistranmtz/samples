import { getLogger } from '@utils/requestLogger';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dtos/user.dto';
import { IUser, UserModel } from '../models/user.model';

export class UserService {
  private toUserResponseDto(user: IUser): UserResponseDto {
    return {
      id: user._id?.toString() || user.id, // Support both .lean() and Mongoose doc
      name: user.name,
      email: user.email,
      userName: user.userName,
    };
  }
  private users: UserResponseDto[] = [];

  public async getAll(traceId: string): Promise<UserResponseDto[]> {
    const log = getLogger(traceId);
    log.info(`[UserService][getAll] Fetching all users`);
    const users = await UserModel.find().lean();
    return users.map(this.toUserResponseDto);
  }

  // get user by id
  public async getById(id: string, traceId: string): Promise<UserResponseDto | null> {
    const log = getLogger(traceId);
    log.info(`[UserService][getById] Fetching user with ID: ${id}`);
    const user = await UserModel.findById(id).lean();
    if (!user) {
      log.warn(`[UserService][getById] User with ID: ${id} not found`);
      throw new Error('User not found');
    }

    log.info(`[UserService][getById] User found: ${JSON.stringify(user)}`);
    return this.toUserResponseDto(user);
  }

  // create user
  public async create(data: CreateUserDto, traceId: string): Promise<UserResponseDto> {
    const log = getLogger(traceId);
    log.info(`[UserService][create] Creating user with data: ${JSON.stringify(data)}`);

    const newUser = new UserModel(data);
    await newUser.save();

    //this.users.push(userResponse);
    return this.toUserResponseDto(newUser);
  }

  // update user
  public async update(id: string, data: UpdateUserDto, traceId: string): Promise<UserResponseDto> {
    const log = getLogger(traceId);
    log.info(
      `[UserService][update] Updating user with ID: ${id} and data: ${JSON.stringify(data)}`,
    );

    const user = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
    if (!user) {
      throw new Error('User not found');
    }

    return this.toUserResponseDto(user);
  }

  // delete user
  public async delete(id: string, traceId: string): Promise<void> {
    const log = getLogger(traceId);
    log.info(`[UserService][delete] Deleting user with ID: ${id}`);
    await UserModel.findByIdAndDelete(id);
  }
}
