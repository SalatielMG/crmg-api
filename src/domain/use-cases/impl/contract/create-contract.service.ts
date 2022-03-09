import { SITE_TIME_ZONE } from '@/application/config/environment';
import { IContractCreationRepository } from '@/domain/models/gateways/contract.repository';
import { ContractRepositoryAdapter } from '@/infrastructure/driven-adapters/adapters/contract.repository.adapter';
import { dateTz } from '@/infrastructure/helpers/util';
import moment from 'moment-timezone';
import { ICreateContractServiceInterface } from '../../interfaces/contract/create-contract.service.interface';

export class CreateContractService implements ICreateContractServiceInterface {

    constructor(
        private readonly contractRepositoryAdapter: ContractRepositoryAdapter
    ) {}

    createContract = async (dataContract: IContractCreationRepository): Promise<ICreateContractServiceInterface.Result> => {
        const contract = await this.contractRepositoryAdapter.createRepository({
            ...dataContract,
            dateStart: dateTz(dataContract.dateStart),
            activatedAt: dateTz(dataContract.activatedAt)
        });
        return {
            contract,
            message: `El contrato ${contract.name} se creó exitosamente`
        }
    }

}