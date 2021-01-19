import { Router } from 'express';

import userController from '@controllers/userController';
import authenticationHandler from '@helpers/authenticationHandler';

const router = Router();

router.route('/')
  .get(authenticationHandler, userController.list)
  .post(userController.create);
router.route('/:id')
  .all(authenticationHandler)
  .get(userController.detail)
  .patch(userController.update)
  .delete(userController.delete);

export default router;
