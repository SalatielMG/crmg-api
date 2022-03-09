import {CreateClientService} from '@/domain/use-cases/impl/client/create-client.service';
import {ClientRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/client.repository.adapter';

export const makeCreateClientFactory = (): CreateClientService => {
    return new CreateClientService(
        new ClientRepositoryAdapter()
    );
}
