import { Request, Response } from 'express';

export default (req: Request, res: Response): Response => {
  const { data, status } = res.locals;

  return res.status(status || 200).json({ data });
};
