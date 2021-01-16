import {
  Router, Request, Response, NextFunction,
} from 'express';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction): void => {
  res.locals.data = 'Pegou';

  return next();
});

export default router;
