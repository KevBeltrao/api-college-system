import User, { IUserSchema } from '@models/User';

export const listUsers = async (): Promise<IUserSchema> => {
  const users = await User.find();

  return users;
};

export const createUser = async (newUserInfo: object): Promise<IUserSchema> => {
  const newUser = await User.create(newUserInfo);

  return newUser;
};

export const detailUser = async (id: string): Promise<IUserSchema> => {
  const user = await User.findById(id);

  return user;
};

export const deleteUser = async (id: string): Promise<void> => User.findByIdAndDelete(id);
