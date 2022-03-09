import { IContractCreationRepository } from '@/domain/models/gateways/contract.repository';
import { ResultContract } from '..';

export interface ICreateContractServiceInterface {
    createContract: (dataContract: IContractCreationRepository) => Promise<ICreateContractServiceInterface.Result>;
}

export namespace ICreateContractServiceInterface {
    export interface Result extends ResultContract {}
}