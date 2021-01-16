import User from '@models/User';

export const createUser = async (newUserInfo: object): Promise<object> => {
  const newUser = await User.create(newUserInfo);

  return newUser;
};
