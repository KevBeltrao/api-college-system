import { Router } from 'express';

import userController from '@controllers/userController';
import authenticationHandler from '@helpers/authenticationHandler';

const router = Router();

router.route('/')
  .all(authenticationHandler({ shouldBeAdmin: true }))
  .get(userController.list)
  .post(userController.create);
router.route('/:id')
  .all(authenticationHandler({ shouldBeAdmin: true }))
  .get(userController.detail)
  .patch(userController.update)
  .delete(userController.delete);

export default router;
