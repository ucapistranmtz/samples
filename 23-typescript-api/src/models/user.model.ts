import { deleteUser } from "../controllers/user.controller";
export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

const users: User[] = [];

export const createUser = (user: Omit<User, "id">): User => {
  const newUser: User = { ...user, id: crypto.randomUUID() };
  users.push(newUser);
  return newUser;
};

export const getAllUsers = () => {
  return users;
};

export const getUserById = (id: string): User | undefined => {
  const user = users.find((user) => user.id === id);
  return user;
};

export const deleteUserById = (id: string): boolean => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return false;
  }
  users.splice(index, 1);
  return true;
};

export const updateUserById = (id: string, updatedData: Partial<User>) => {
  const user = getUserById(id);
  if (!user) {
    return null;
  }

  Object.assign(user, updatedData);
  return user;
};
