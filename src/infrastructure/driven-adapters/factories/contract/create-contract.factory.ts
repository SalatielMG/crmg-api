import { CreateContractService } from '@/domain/use-cases/impl/contract/create-contract.service';
import { ContractRepositoryAdapter } from '../../adapters/contract.repository.adapter';

export const makeCreateContractFactory = (): CreateContractService => new CreateContractService(
    new ContractRepositoryAdapter()
);