import { Request, Response, NextFunction } from 'express';

import { detailUser } from '@repositories/contactRepository';
import sendEmail from '@utils/sendEmail';
import contactTemplate from '@templates/contactTemplate';

export default {
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { message } = req.body;

    const user = await detailUser(res.locals.userId);

    const { name, email } = user;

    const systemEmail = process.env.EMAIL;

    await sendEmail({
      to: systemEmail || '',
      subject: 'Confirmação de email - College System',
      html: contactTemplate({
        name,
        email,
        message,
      }),
    });

    res.locals.data = 'Sent successfully';
    res.locals.status = 200;

    return next();
  },
};
