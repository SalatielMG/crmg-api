import {Router} from 'express';
import {Router as RouterType} from 'express-serve-static-core';
import {adaptRoute} from '@/application/config/express-router-adapter';
import {middlewareAdapter, validateMiddlewareAdapter} from '@/application/config/middleware-adapter';
import {
    CreateClientSchema,
    DeleteClientSchema,
    UpdateClientSchema
} from '@/application/middlewares/validators-schemas/client.schema';
import {ClientController} from '@/infrastructure/entry-points/controllers/client/client.controller';
import {ClientMiddleware} from '@/application/middlewares/client';
import contractRoutes from './contract.router';
import { GetContractClientSchema } from '@/application/middlewares/validators-schemas/contract.schema';

const router: RouterType = Router();

router.get(``, adaptRoute(new ClientController()));
router.get(`/:clientId`, [
    middlewareAdapter(new ClientMiddleware('VALIDATE_CLIENT_BELONGS_TO_COMPANY'))
], adaptRoute(new ClientController()));
router.post(``, [
    validateMiddlewareAdapter(CreateClientSchema),
    middlewareAdapter(new ClientMiddleware())
], adaptRoute(new ClientController()));
router.put(`/:clientId`, [
    validateMiddlewareAdapter(UpdateClientSchema),
    middlewareAdapter(new ClientMiddleware('VALIDATE_CLIENT_BELONGS_TO_COMPANY')),
    middlewareAdapter(new ClientMiddleware())
], adaptRoute(new ClientController()));
router.delete(`/:clientId`, [
    validateMiddlewareAdapter(DeleteClientSchema),
    middlewareAdapter(new ClientMiddleware('VALIDATE_CLIENT_BELONGS_TO_COMPANY')),
    middlewareAdapter(new ClientMiddleware())
], adaptRoute(new ClientController()));

router.use('/:clientId/contract', [
    validateMiddlewareAdapter(GetContractClientSchema),
    middlewareAdapter(new ClientMiddleware('VALIDATE_CLIENT_BELONGS_TO_COMPANY'))
], contractRoutes);

export default router;
