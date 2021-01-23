import { Router } from 'express';

import userDisciplineController from '@controllers/userDisciplineController';
import authenticationHandler from '@helpers/authenticationHandler';

const router = Router();

router.route('/')
  .get(authenticationHandler({ shouldBeAdmin: false }), userDisciplineController.list)
  .post(authenticationHandler({ shouldBeAdmin: true }), userDisciplineController.create);
router.route('/:id')
  .get(authenticationHandler({ shouldBeAdmin: false }), userDisciplineController.detail)
  .patch(authenticationHandler({ shouldBeAdmin: true }), userDisciplineController.update)
  .delete(authenticationHandler({ shouldBeAdmin: true }), userDisciplineController.delete);

export default router;
