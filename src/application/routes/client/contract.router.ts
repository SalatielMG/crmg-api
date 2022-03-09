import { adaptRoute } from '@/application/config/express-router-adapter';
import { ClientMiddleware } from '@/application/middlewares/client';
import { ContractMiddleware } from '@/application/middlewares/client/contract.middleware';
import { CreateContractClientSchema, DeleteContractClientSchema, UpdateContractClientSchema, UpdateStatusContractClientSchema } from '@/application/middlewares/validators-schemas/contract.schema';
import { ContractController } from '@/infrastructure/entry-points/controllers/client/contract.controller';
import {Router} from 'express';
import {Router as RouterType} from 'express-serve-static-core';
import { middlewareAdapter, validateMiddlewareAdapter } from '../../config/middleware-adapter';

const router: RouterType = Router();

/**
 * Get all contracts by client
 */
router.get(``, adaptRoute(new ContractController()));
/**
 * Add a new Contract to Client
 */
router.post(``, [
    validateMiddlewareAdapter(CreateContractClientSchema),
    middlewareAdapter(new ContractMiddleware())
], adaptRoute(new ContractController()));
/**
 * Update contract to Client
 */
router.put(`/:contractId`, [
    validateMiddlewareAdapter(UpdateContractClientSchema),
    middlewareAdapter(new ContractMiddleware('VALIDATE_CONTRACT_CLIENT_BELONGS_TO_COMPANY')),
    middlewareAdapter(new ContractMiddleware())
], adaptRoute(new ContractController()));
/**
 * Paused | Canceled | Activated Contract to Client
 */
router.put(`/:contractId/status`, [
    validateMiddlewareAdapter(UpdateStatusContractClientSchema),
    middlewareAdapter(new ContractMiddleware('VALIDATE_CONTRACT_CLIENT_BELONGS_TO_COMPANY')),
    middlewareAdapter(new ContractMiddleware('UPDATE_STATUS'))
], adaptRoute(new ContractController('UPDATE_STATUS')));
/**
 * Deleted Contract to Client
 */
router.delete(`/:contractId`, [
    validateMiddlewareAdapter(DeleteContractClientSchema),
    middlewareAdapter(new ContractMiddleware('VALIDATE_CONTRACT_CLIENT_BELONGS_TO_COMPANY')),
    middlewareAdapter(new ContractMiddleware())
], adaptRoute(new ContractController()));

export default router;
