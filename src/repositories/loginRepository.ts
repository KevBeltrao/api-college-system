import User from '@models/User';

export const detailUser = async (info: string): Promise<object> => {
  const user = await User.findOne({
    $or: [
      { email: info },
      { registration: info },
      { cpf: info },
    ],
  }).select('+password');

  return user;
};
