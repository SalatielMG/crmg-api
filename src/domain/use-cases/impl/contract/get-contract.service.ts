import { ContractRepositoryAdapter } from '@/infrastructure/driven-adapters/adapters/contract.repository.adapter';
import { IGetContractServiceInterface } from '../../interfaces/contract/get-contract.service.interface';

export class GetContractService implements IGetContractServiceInterface {

    constructor(
        private readonly contractRepositoryAdapter: ContractRepositoryAdapter
    ) {}

    getContracts = async (companyId: number, clientId: number): Promise<IGetContractServiceInterface.Results> => {
        console.log('clientId getContracts', clientId);
        const contracts = await this.contractRepositoryAdapter.findAllRepository({
            where: {
                companyId,
                clientId
            },
            order: [
                ['dateStart', 'DESC']
            ]
        })
        return {
            contracts
        };
    }
    
    getContract = async (companyId: number, clientId: number, contractId: number): Promise<IGetContractServiceInterface.Result> => {
        const contract = await this.contractRepositoryAdapter.findOneRepository({
            id: contractId,
            companyId,
            clientId
        });
        return contract ? {
            contract
        } : null;
    }

}