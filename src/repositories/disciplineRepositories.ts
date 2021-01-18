import Discipline, { IDiscipline } from '@models/Discipline';

export const listDisciplines = async (): Promise<IDiscipline> => {
  const disciplines = await Discipline.find();

  return disciplines;
};

export const createDiscipline = async (newDisciplineInfo: object): Promise<IDiscipline> => {
  const newDiscipline = await Discipline.create(newDisciplineInfo);

  return newDiscipline;
};

export const detailDiscipline = async (id: string): Promise<IDiscipline> => {
  const discipline = await Discipline.findById(id);

  return discipline;
};

export const deleteDiscipline = async (id: string): Promise<void> => (
  Discipline.findByIdAndDelete(id)
);
