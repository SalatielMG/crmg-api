import { ContractModel } from '@/domain/models/contract.model';
import { IContractCreationRepository, IContractRepository } from '@/domain/models/gateways/contract.repository';
import { BaseRepositoryAdapter } from './base.repository.adapter';

export class ContractRepositoryAdapter extends BaseRepositoryAdapter<IContractRepository, IContractCreationRepository, ContractModel> {
    constructor() {
        super(ContractModel);
    }
}