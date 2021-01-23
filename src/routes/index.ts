import { Router } from 'express';

import authenticationHandler from '@helpers/authenticationHandler';

import userRoutes from './userRoutes';
import disciplineRoutes from './disciplineRoutes';
import userDisciplineRoutes from './userDisciplineRoutes';
import authenticationRoutes from './authenticationRoutes';

const router = Router();

router.use('/users', authenticationHandler({ shouldBeAdmin: true }), userRoutes);
router.use('/disciplines', disciplineRoutes);
router.use('/user-disciplines', userDisciplineRoutes);
router.use('/login', authenticationRoutes);

export default router;
