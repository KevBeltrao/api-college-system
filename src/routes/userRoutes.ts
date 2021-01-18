import { Router } from 'express';

import userController from '@controllers/userController';

const router = Router();

router.route('/')
  .get(userController.list)
  .post(userController.create);
router.route('/:id')
  .get(userController.detail)
  .patch(userController.update)
  .delete(userController.delete);

export default router;
