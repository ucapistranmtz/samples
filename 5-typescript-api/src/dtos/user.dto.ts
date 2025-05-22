export interface CreateUserDto {
  name: string;
  email: string;
  userName: string;
  password: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  userName?: string;
}

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  userName: string;
}
