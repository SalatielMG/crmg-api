import { IContractRepository, StatusTypeContract } from '@/domain/models/gateways/contract.repository';
import { ResultContract } from '..';

export interface IUpdateContractServiceInterface {
    updateStatusContract: (dataContract: Partial<IContractRepository>, companyId: number, clientId: number, contractId: number) => Promise<IUpdateContractServiceInterface.Result>;
    updateContract: (dataContract: Partial<IContractRepository>, companyId: number, clientId: number, contractId: number) => Promise<IUpdateContractServiceInterface.Result>;
}

export namespace IUpdateContractServiceInterface {
    export interface Result extends ResultContract {}
}