import {IDestroyClientServiceInterface} from '@/domain/use-cases/interfaces/client/destroy-client-service.interface';
import {ClientRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/client.repository.adapter';

export class DestroyClientService implements IDestroyClientServiceInterface {
    constructor(
        private readonly clientRepositoryAdapter: ClientRepositoryAdapter
    ) {}

    destroyClient = async (clientId: number): Promise<IDestroyClientServiceInterface.Result> => {
        const client = await this.clientRepositoryAdapter.destroyByIdRepository(clientId);
        return {
            client,
            message: `El cliente ${client.name} ha sido eliminado con exito`
        }
    };

}
