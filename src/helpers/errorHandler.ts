import { Request, Response, NextFunction } from 'express';

import HttpException from '@src/customTypes/HttpException';

export default (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.locals = {
    data: error.message || error,
    status: res.locals.status || 400,
  };

  return next();
};
