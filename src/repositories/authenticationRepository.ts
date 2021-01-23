import User, { IUserSchema } from '@models/User';

export const detailUser = async (info: string): Promise<IUserSchema> => {
  const user = await User.findOne({
    $or: [
      { email: info },
      { registration: info },
      { cpf: info },
    ],
  }).select('+password');

  return user;
};
