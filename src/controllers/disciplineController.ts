import { Request, Response, NextFunction } from 'express';

import disciplineValidator from '@validators/disciplineValidator';
import scheduleValidator from '@validators/utils/scheduleValidator';
import {
  createDiscipline,
  listDisciplines,
  detailDiscipline,
  deleteDiscipline,
} from '@repositories/disciplineRepository';

export default {
  list: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const disciplines = await listDisciplines();

    res.locals.data = disciplines;

    return next();
  },
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      name,
      professor,
      difficulty,
      schedule,
    } = req.body;

    const newDisciplineInfo = {
      name,
      professor,
      difficulty,
      schedule,
    };

    const invalidTimeRanges = schedule.filter((
      timeRange: {startHourInMinutes: number, endHourInMinutes: number},
    ) => (
      !scheduleValidator(timeRange)
    ));

    if (invalidTimeRanges.length) {
      return next({ message: 'Invalid time ranges' });
    }

    disciplineValidator.checkCreate(newDisciplineInfo);

    const newDiscipline = await createDiscipline(newDisciplineInfo);

    res.locals.data = newDiscipline;
    res.locals.status = 201;

    return next();
  },
  detail: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const discipline = await detailDiscipline(id);

    if (!discipline) {
      res.locals.status = 404;

      return next({ message: 'Discipline not found' });
    }

    res.locals.data = discipline;

    return next();
  },
  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      name,
      professor,
      difficulty,
      schedule,
    } = req.body;
    const { id } = req.params;

    const discipline = await detailDiscipline(id);

    if (!discipline) {
      res.locals.status = 404;

      return next({ message: 'Discipline not found' });
    }

    discipline.name = name || discipline.name;
    discipline.professor = professor || discipline.professor;
    discipline.difficulty = difficulty || discipline.difficulty;
    discipline.schedule = schedule || discipline.schedule;

    const invalidTimeRanges = schedule.filter((
      timeRange: {startHourInMinutes: number, endHourInMinutes: number},
    ) => (
      !scheduleValidator(timeRange)
    ));

    if (invalidTimeRanges.length) {
      return next({ message: 'Invalid time ranges' });
    }

    disciplineValidator.checkCreate(discipline);

    const updatedUser = await discipline.save();

    res.locals.data = updatedUser;

    return next();
  },
  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const discipline = await detailDiscipline(id);

    if (!discipline) {
      res.locals.status = 404;

      return next({ message: 'Discipline not found' });
    }

    await deleteDiscipline(id);

    res.locals.data = 'Deleted successfully';

    return next();
  },
};
