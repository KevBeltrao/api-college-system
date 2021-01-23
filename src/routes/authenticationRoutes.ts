import { Router } from 'express';

import authenticationController from '@controllers/authenticationController';

const router = Router();

router.route('/')
  .post(authenticationController.create);

export default router;
