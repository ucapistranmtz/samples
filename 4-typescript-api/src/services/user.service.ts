import { getLogger } from '@utils/requestLogger';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dtos/user.dto';
import { v4 as uuid } from 'uuid';


export class UserService {

   
    private users: UserResponseDto[] = [];

    public async getAll(traceId:string): Promise<UserResponseDto[]> {
        const log= getLogger(traceId);
        log.info(`[UserService][getAll] Fetching all users`);
        return this.users;
    }

    // get user by id
    public async getById(id: string,traceId:string): Promise<UserResponseDto | null> {
        const log= getLogger(traceId);
        log.info(`[UserService][getById] Fetching user with ID: ${id}`);
        const user = this.users.find(user => user.id === id);

        if (!user) {
            throw new Error('User not found');
        }
        return user || null;
    }

    // create user
    public async create(data: CreateUserDto,traceId:string): Promise<UserResponseDto> {
        const log= getLogger(traceId);
        log.info(`[UserService][create] Creating user with data: ${JSON.stringify(data)}`); 
        const newUser: UserResponseDto = {
            id: uuid(), ...data
        };

        this.users.push(newUser);
        return newUser;
    }

    // update user
    public async update(id: string, data: UpdateUserDto,traceId:string): Promise<UserResponseDto > { 

        const log= getLogger(traceId);
        log.info(`[UserService][update] Updating user with ID: ${id} and data: ${JSON.stringify(data)}`);

        const userIndex = this.users.findIndex(user => user.id === id);
        if(userIndex === -1) {
            throw new Error('User not found');
        }
        const updatedUser: UserResponseDto = { ...this.users[userIndex],...data};
        this.users[userIndex] = updatedUser;
        return updatedUser;
        
    }

    // delete user
    public async delete (id:string,traceId:string):Promise<void>{
        const log= getLogger(traceId);
        log.info(`[UserService][delete] Deleting user with ID: ${id}`);
        this.users = this.users.filter(user => user.id !== id);
    }

}
