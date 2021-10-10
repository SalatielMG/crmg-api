import express, {Request, Response} from "express";
import authRoutes from './auth.router';
import CommonRoutes from './common.router';
import personnelRoutes from './personnel.router';
import {Router as RouterType} from 'express-serve-static-core';

/**
 * Base router "/api/v1"
 * @param router
 */
const router: RouterType = express.Router();

router.use('/auth', authRoutes);
router.use('/common', CommonRoutes);
router.use('/personnel', personnelRoutes);

router.get('/', (req: Request, res: Response) => {
    res.json("Welcome to Api CRMG")
});

export default router;
