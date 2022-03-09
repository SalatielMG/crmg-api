import { IContractRepository, StatusTypeContract } from '@/domain/models/gateways/contract.repository';
import { ContractRepositoryAdapter } from '@/infrastructure/driven-adapters/adapters/contract.repository.adapter';
import { translate } from '@/infrastructure/helpers/translate';
import { dateTz } from '@/infrastructure/helpers/util';
import { IUpdateContractServiceInterface } from '../../interfaces/contract/update-contract.service.interface';

export class UpdateContractService implements IUpdateContractServiceInterface {

    constructor (
        private readonly contractRepositoryAdapter: ContractRepositoryAdapter
    ) {}

    updateStatusContract = async (dataContract: Partial<IContractRepository>, companyId: number, clientId: number, contractId: number): Promise<IUpdateContractServiceInterface.Result> => {
        const contract = await this.contractRepositoryAdapter.updateOneRepository({
            companyId,
            clientId,
            id: contractId
        }, dataContract)
        const translateStatus = translate('CONTRACT_STATUS')[dataContract.status];

        return {
             message: `El contrato ${contract.name} ha sido ${translateStatus.literal} exitosamente`,
             contract
        }
    }

    updateContract = async (dataContract: Partial<IContractRepository>, companyId: number, clientId: number, contractId: number): Promise<IUpdateContractServiceInterface.Result> => {
        const contract = await this.contractRepositoryAdapter.updateOneRepository({
            companyId,
            clientId,
            id: contractId
        }, {
            ...dataContract,
            dateStart: dateTz(dataContract.dateStart)
        });

        return {
            message: `El contrato ${contract.name} ha sido actualizado exitosamente`,
            contract
        }

    }

}