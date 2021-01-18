import { Router } from 'express';

import userRoutes from './userRoutes';
import disciplineRoutes from './disciplineRoutes';
import userDisciplineRoutes from './userDisciplineRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/disciplines', disciplineRoutes);
router.use('/user-disciplines', userDisciplineRoutes);

export default router;
