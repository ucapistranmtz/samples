import { getLogger } from '@utils/requestLogger';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dtos/user.dto';
import { v4 as uuid } from 'uuid';


export class UserService {
  
    private users: UserResponseDto[] = [];

    public async getAll(): Promise<UserResponseDto[]> {
      
        return this.users;
    }

    // get user by id
    public async getById(id: string): Promise<UserResponseDto | null> {
        
        const user = this.users.find(user => user.id === id);

        if (!user) {
            throw new Error('User not found');
        }
        return user || null;
    }

    // create user
    public async create(data: CreateUserDto): Promise<UserResponseDto> {
     
        const newUser: UserResponseDto = {
            id: uuid(), ...data
        };

        this.users.push(newUser);
        return newUser;
    }

    // update user
    public async update(id: string, data: UpdateUserDto): Promise<UserResponseDto > { 
       
        
        const userIndex = this.users.findIndex(user => user.id === id);
        if(userIndex === -1) {
            throw new Error('User not found');
        }
        const updatedUser: UserResponseDto = { ...this.users[userIndex],...data};
        this.users[userIndex] = updatedUser;
        return updatedUser;
        
    }

    // delete user
    public async delete (id:string):Promise<void>{
        
        this.users = this.users.filter(user => user.id !== id);
    }

}
