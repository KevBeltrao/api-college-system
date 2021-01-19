import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default async (
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

  res.locals.userId = (decoded as any).id;

  return next();
};
