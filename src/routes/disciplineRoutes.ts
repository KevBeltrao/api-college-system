import { Router } from 'express';

import disciplineController from '@controllers/disciplineController';
import authenticationHandler from '@helpers/authenticationHandler';

const router = Router();

router.route('/')
  .all(authenticationHandler)
  .get(disciplineController.list)
  .post(disciplineController.create);
router.route('/:id')
  .all(authenticationHandler)
  .get(disciplineController.detail)
  .patch(disciplineController.update)
  .delete(disciplineController.delete);

export default router;
