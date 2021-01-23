import UserDiscipline, { IUserDiscipline } from '@models/UserDiscipline';

export const listUserDisciplines = async (): Promise<IUserDiscipline> => {
  const userDisciplines = await UserDiscipline.find();

  return userDisciplines;
};

export const createUserDiscipline = async (
  newUserDisciplineInfo: object,
): Promise<IUserDiscipline> => {
  const newUserDiscipline = await UserDiscipline.create(newUserDisciplineInfo);

  return newUserDiscipline;
};

export const detailUserDiscipline = async (id: string): Promise<IUserDiscipline> => {
  const userDiscipline = await UserDiscipline.findById(id);

  return userDiscipline;
};

export const deleteUserDiscipline = async (id: string): Promise<void> => (
  UserDiscipline.findByIdAndDelete(id)
);
