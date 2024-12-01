import { Router } from 'express';
const router = Router();
import thoughtRoutes from './thoughtRoutes.js';
import userRoutes from './userRoutes.js';
router.use('/thought', thoughtRoutes);
router.use('/users', userRoutes);
export default router;
