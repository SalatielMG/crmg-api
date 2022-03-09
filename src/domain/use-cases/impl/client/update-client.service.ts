import {IUpdateClientServiceInterface} from '@/domain/use-cases/interfaces/client/update-client.service.interface';
import {IClientRepository} from '@/domain/models/gateways/client.repository';
import {ClientRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/client.repository.adapter';

export class UpdateClientService implements IUpdateClientServiceInterface {

    constructor(
        private readonly clientRepositoryAdapter: ClientRepositoryAdapter
    ) {}

    updateClient = async (dataClient: Partial<IClientRepository>, clientId: number): Promise<IUpdateClientServiceInterface.Result> => {
        const client = await this.clientRepositoryAdapter.updateByIdRepository(clientId, dataClient);
        return {
            client,
            message: `El cliente ${client.name} ha sido modificado exitosamente`
        }
    }
}
