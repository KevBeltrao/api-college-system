import { Router } from 'express';

import userDisciplineController from '@controllers/userDisciplineController';

const router = Router();

router.route('/')
  .get(userDisciplineController.list)
  .post(userDisciplineController.create);
router.route('/:id')
  .get(userDisciplineController.detail)
  .patch(userDisciplineController.update)
  .delete(userDisciplineController.delete);

export default router;
