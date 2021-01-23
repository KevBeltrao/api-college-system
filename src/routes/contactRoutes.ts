import { Router } from 'express';

import contactMessageController from '@controllers/contactMessageController';
import authenticationHandler from '@helpers/authenticationHandler';

const router = Router();

router.route('/')
  .post(authenticationHandler({ shouldBeAdmin: false }), contactMessageController.create);

export default router;
