import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

import userValidator from '@validators/userValidator';
import { createUser } from '@repositories/userRepositories';

export default {
  list: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.locals.data = 'salve';

    return next();
  },
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      name,
      email,
      password,
      cpf,
      ...firstSemester
    } = req.body;

    const newUserInfo = {
      name,
      email,
      password,
      registration: uuidv4(),
      cpf: cpf.replace('.', '').replace('-', ''),
      firstSemester,
    };

    userValidator.checkCreate(newUserInfo);

    const newUser = await createUser(newUserInfo);

    res.locals.data = newUser;
    res.locals.status = 201;

    return next();
  },
};
