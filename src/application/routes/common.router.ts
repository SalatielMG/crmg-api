import {Router} from 'express';

import {Router as RouterType} from 'express-serve-static-core';
import {adaptRoute} from '@/application/config/express-router-adapter';
import {CommonController} from '@/infrastructure/entry-points/controllers/common.controller';
import {auth} from '@/application/middlewares/auth.middleware';

const router: RouterType = Router();

router.get(`/personnel/user`, auth, adaptRoute(new CommonController));

export default router;
