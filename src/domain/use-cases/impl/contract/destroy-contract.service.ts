import { ContractRepositoryAdapter } from '@/infrastructure/driven-adapters/adapters/contract.repository.adapter';
import { ok } from 'assert';
import { IDestroyContractServiceInterface } from '../../interfaces/contract/destroy-contract.service.interface';

export class DestroyContractService implements IDestroyContractServiceInterface {

    constructor (
        private readonly contractRepository:
        ContractRepositoryAdapter
    ) {}

    destroyContract = async (contractId: number): Promise<IDestroyContractServiceInterface.Result> => {
        const contract = await this.contractRepository.destroyByIdRepository(contractId);
        return {
            contract,
            message: `El contrato ${contract.name} ha sido eliminado con exito`
        };
    }

}