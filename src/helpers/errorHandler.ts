import { Request, Response, NextFunction } from 'express';

import HttpException from '@src/customTypes/HttpException';

export default (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (
    process.env.NODE_ENV === 'development'
    || process.env.NODE_ENV === 'test'
    || error.constructor.name === 'object'
  ) {
    res.locals = {
      data: error.message,
      status: res.locals.status || 400,
    };

    return next();
  }

  res.locals = {
    data: 'Server internal error',
    status: 500,
  };

  return next();
};
