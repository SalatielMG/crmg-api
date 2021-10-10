import {Router} from 'express';
import {Router as RouterType} from 'express-serve-static-core';
import {adaptRoute} from '@/application/config/express-router-adapter';
import {PersonnelController} from '@/infrastructure/entry-points/controllers/personnel.controller';

const router: RouterType = Router();

router.get(`/:id`, adaptRoute(new PersonnelController()));

export default router;
