import { UpdateContractService } from '@/domain/use-cases/impl/contract/update-contract.service';
import { ContractRepositoryAdapter } from '../../adapters/contract.repository.adapter';

export const makeUpdateContractFactory = ():UpdateContractService => new UpdateContractService(
    new ContractRepositoryAdapter()
)