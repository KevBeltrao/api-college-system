import { Request, Response, NextFunction } from 'express';

import userDisciplineValidator from '@validators/userDisciplineValidator';

import {
  createUserDiscipline,
  listUserDisciplines,
  detailUserDiscipline,
  deleteUserDiscipline,
} from '@repositories/userDisciplineRepositories';

export default {
  list: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userDisciplines = await listUserDisciplines();

    res.locals.data = userDisciplines;

    return next();
  },
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      userId,
      disciplineId,
      finalScore,
      semester,
    } = req.body;
    const newUserDisciplineInfo = {
      userId,
      disciplineId,
      finalScore,
      semester,
      status: 'em andamento',
    };

    if (finalScore === undefined || finalScore === null) {
      newUserDisciplineInfo.status = 'em andamento';
    } else if (finalScore >= 5) {
      newUserDisciplineInfo.status = 'aprovado';
    } else {
      newUserDisciplineInfo.status = 'reprovado';
    }

    userDisciplineValidator.checkCreate(newUserDisciplineInfo);

    const newUserDiscipline = await createUserDiscipline(newUserDisciplineInfo);

    res.locals.data = newUserDiscipline;
    res.locals.status = 201;

    return next();
  },
  detail: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const userDiscipline = await detailUserDiscipline(id);

    if (!userDiscipline) {
      res.locals.status = 404;

      return next({ message: 'UserDiscipline not found' });
    }

    res.locals.data = userDiscipline;

    return next();
  },
  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { finalScore } = req.body;

    const { id } = req.params;

    const userDiscipline = await detailUserDiscipline(id);

    if (!userDiscipline) {
      res.locals.status = 404;

      return next({ message: 'UserDiscipline not found' });
    }

    if (finalScore === undefined || finalScore === null) {
      userDiscipline.status = 'em andamento';
    } else if (finalScore >= 5) {
      userDiscipline.status = 'aprovado';
    } else {
      userDiscipline.status = 'reprovado';
    }

    userDiscipline.finalScore = finalScore;

    userDisciplineValidator.checkUpdate(userDiscipline);

    const updatedUser = await userDiscipline.save();

    res.locals.data = updatedUser;

    return next();
  },
  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const userDiscipline = await detailUserDiscipline(id);

    if (!userDiscipline) {
      res.locals.status = 404;

      return next({ message: 'UserDiscipline not found' });
    }

    await deleteUserDiscipline(id);

    res.locals.data = 'Deleted successfully';

    return next();
  },
};
