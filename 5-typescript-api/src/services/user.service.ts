import { getLogger } from '@utils/logger';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '@dtos/user.dto';
import { IUser, UserModel } from '@models/user.model';
import bcrypt from 'bcrypt';

export class UserService {
  private toUserResponseDto(user: IUser): UserResponseDto {
    return {
      id: user._id?.toString() || user.id, // Support both .lean() and Mongoose doc
      name: user.name,
      email: user.email,
      userName: user.userName
    };
  }

  public async getAll(traceId: string): Promise<UserResponseDto[]> {
    const log = getLogger(traceId);
    log.info('[userService][getAll] Fetching all users');
    const users = await UserModel.find().lean();
    return users.map(this.toUserResponseDto);
  }

  public async getById(id: string, traceId: string): Promise<UserResponseDto | null> {
    const log = getLogger(traceId);
    log.info(`[userService][getById] Fetching user with ID: ${id}`);
    const user = await UserModel.findById(id).lean();
    return user ? this.toUserResponseDto(user) : null;
  }

  public async getByEmail(email: string, traceId: string): Promise<UserResponseDto | null> {
    const log = getLogger(traceId);
    log.info(`[userService][getByEmail] Fetching user with email: ${email}`);
    const user = await UserModel.findOne({ email }).lean();
    return user ? this.toUserResponseDto(user) : null;
  }

  public async create(data: CreateUserDto, traceId: string): Promise<UserResponseDto> {
    const log = getLogger(traceId);
    log.info('[userService][create] Creating user');
    const passwordHash = await bcrypt.hash(data.password, 10);
    const { password, ...rest } = data;
    const newUser = new UserModel({ ...rest, passwordHash });
    await newUser.save();
    return this.toUserResponseDto(newUser);
  }

  public async update(id: string, data: UpdateUserDto, traceId: string): Promise<UserResponseDto> {
    const log = getLogger(traceId);
    log.info(`[userService][update] Updating user with ID: ${id}`);
    const user = await UserModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
    if (!user) throw new Error('User not found');
    return this.toUserResponseDto(user);
  }

  public async delete(id: string, traceId: string): Promise<void> {
    const log = getLogger(traceId);
    log.info(`[userService][delete] Deleting user with ID: ${id}`);
    await UserModel.findByIdAndDelete(id);
  }
}
