import User, { IUserSchema } from '@models/User';

export const detailUser = async (id: string): Promise<IUserSchema> => {
  const user = await User.findById(id);

  return user;
};
