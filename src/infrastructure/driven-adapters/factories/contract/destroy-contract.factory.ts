import { DestroyContractService } from '@/domain/use-cases/impl/contract/destroy-contract.service';
import { ContractRepositoryAdapter } from '../../adapters/contract.repository.adapter';

export const makeDestroyContractFactory = (): DestroyContractService => new DestroyContractService(
    new ContractRepositoryAdapter()
);