// the dto are used to define the structure of the data that is sent to and received from the API
// and it's different from the model
// it gives us flexibility to change the structure of the data without changing the model

export interface CreateUserDto {
  name: string;
  email: string;
  userName: string;
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
