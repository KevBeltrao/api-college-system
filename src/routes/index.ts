import { Router } from 'express';

import userRoutes from './userRoutes';
import disciplineRoutes from './disciplineRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/disciplines', disciplineRoutes);

export default router;
