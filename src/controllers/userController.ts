import { Request, Response, NextFunction } from 'express';

export default {
  list: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.locals.data = 'salve';

    return next();
  },
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.locals.data = 'salve';

    return next();
  },
};
