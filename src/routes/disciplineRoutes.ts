import { Router } from 'express';

import disciplineController from '@controllers/disciplineController';
import authenticationHandler from '@helpers/authenticationHandler';

const router = Router();

router.route('/')
  .get(authenticationHandler({ shouldBeAdmin: false }), disciplineController.list)
  .post(authenticationHandler({ shouldBeAdmin: true }), disciplineController.create);
router.route('/:id')
  .get(authenticationHandler({ shouldBeAdmin: false }), disciplineController.detail)
  .patch(authenticationHandler({ shouldBeAdmin: true }), disciplineController.update)
  .delete(authenticationHandler({ shouldBeAdmin: true }), disciplineController.delete);

export default router;
