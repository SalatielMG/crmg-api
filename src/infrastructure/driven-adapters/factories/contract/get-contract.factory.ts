import { GetContractService } from '@/domain/use-cases/impl/contract/get-contract.service';
import { ContractRepositoryAdapter } from '../../adapters/contract.repository.adapter';

export const makeGetContract = (): GetContractService => new GetContractService(
    new ContractRepositoryAdapter()
);