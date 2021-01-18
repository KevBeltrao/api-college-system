import { Request, Response, NextFunction } from 'express';

import generateRegistration from '@utils/generateRegistration';
import userValidator from '@validators/userValidator';
import {
  createUser,
  listUsers,
  detailUser,
  deleteUser,
} from '@repositories/userRepositories';

export default {
  list: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const users = await listUsers();

    res.locals.data = users;

    return next();
  },
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      name,
      email,
      password,
      cpf,
      course,
      ...firstSemester
    } = req.body;

    const newUserInfo = {
      name,
      email,
      password,
      registration: generateRegistration(),
      cpf: cpf.split('.').join('').split('-').join(''),
      course,
      firstSemester,
    };

    userValidator.checkCreate(newUserInfo);

    const newUser = await createUser(newUserInfo);

    res.locals.data = newUser;
    res.locals.status = 201;

    return next();
  },
  detail: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const user = await detailUser(id);

    if (!user) {
      res.locals.status = 404;

      return next({ message: 'User not found' });
    }

    res.locals.data = user;

    return next();
  },
  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, email, cpf } = req.body;
    const { id } = req.params;

    userValidator.checkUpdate(req.body);

    const user = await detailUser(id);

    if (!user) {
      res.locals.status = 404;

      return next({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.cpf = cpf || user.cpf;

    const updatedUser = await user.save();

    res.locals.data = updatedUser;

    return next();
  },
  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const user = await detailUser(id);

    if (!user) {
      res.locals.status = 404;

      return next({ message: 'User not found' });
    }

    await deleteUser(id);

    res.locals.data = 'Deleted successfully';

    return next();
  },
};
