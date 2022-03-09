import {ICreateClientServiceInterface} from '@/domain/use-cases/interfaces/client/create-client.service.interface';
import {IClientCreationRepository} from '@/domain/models/gateways/client.repository';
import {ClientRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/client.repository.adapter';

export class CreateClientService implements ICreateClientServiceInterface {

    constructor(
       private readonly clientRepositoryAdapter: ClientRepositoryAdapter
    ) {}

    createClient = async (dataClient: IClientCreationRepository): Promise<ICreateClientServiceInterface.Result> => {
        const client = await this.clientRepositoryAdapter.createRepository(dataClient);
        return {
            client,
            // success: true,
            message: `El cliente ${dataClient.name} ${dataClient.lastName} ${dataClient.lastName} se creó exitosamente`
        }
    }

}
