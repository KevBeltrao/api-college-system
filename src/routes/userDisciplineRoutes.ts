import { Router } from 'express';

import userDisciplineController from '@controllers/userDisciplineController';
import authenticationHandler from '@helpers/authenticationHandler';

const router = Router();

router.route('/')
  .all(authenticationHandler)
  .get(userDisciplineController.list)
  .post(userDisciplineController.create);
router.route('/:id')
  .all(authenticationHandler)
  .get(userDisciplineController.detail)
  .patch(userDisciplineController.update)
  .delete(userDisciplineController.delete);

export default router;
