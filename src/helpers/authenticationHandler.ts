import {
  Request, Response, NextFunction, RequestHandler,
} from 'express';
import jwt from 'jsonwebtoken';

import User from '@models/User';

export default ({ shouldBeAdmin }: { shouldBeAdmin: Boolean }): RequestHandler => async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.locals.status = 401;
    return next('No token provided');
  }

  const parts = authorization.split(' ');

  if (parts.length !== 2) {
    res.locals.status = 401;
    return next('Wrong format token');
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    res.locals.status = 401;
    return next('Invalid token');
  }

  const decoded = await jwt.verify(token, process.env.SECRET || '');

  const userId = (decoded as any).id;

  const user = await User.findById(userId);

  if (!user) return next({ message: 'User not found' });

  if (
    shouldBeAdmin
    && user.role !== 'admin'
  ) {
    res.locals.status = 401;

    return next({ message: 'Forbidden' });
  }

  res.locals.userId = userId;

  return next();
};
