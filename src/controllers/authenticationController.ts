import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

import generateToken from '@utils/generateToken';
import {
  detailUser,
} from '@repositories/authenticationRepository';

export default {
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      login,
      password,
    } = req.body;

    if (!login || !password) {
      return next({ message: 'Missing fields' });
    }

    const user = await detailUser(login);

    if (!user) {
      res.locals.status = 404;

      return next({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password || '');

    if (!isPasswordCorrect) {
      res.locals.status = 401;

      return next({ message: 'Wrong credentials' });
    }

    delete user.password;

    res.locals.data = {
      user,
      token: generateToken({ id: user._id }),
    };

    res.locals.status = 200;

    return next();
  },
};
