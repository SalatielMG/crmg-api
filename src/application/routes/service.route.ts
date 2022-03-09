import { ServiceController } from '@/infrastructure/entry-points/controllers/service.controller';
import {Router} from 'express';
import {Router as RouterType} from 'express-serve-static-core';
import { adaptRoute } from '../config/express-router-adapter';
const router: RouterType = Router();

router.get('/contract', adaptRoute(new ServiceController('GET_SERVICES_CONTRACT')));

export default router;