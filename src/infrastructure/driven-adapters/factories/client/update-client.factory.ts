import {UpdateClientService} from '@/domain/use-cases/impl/client/update-client.service';
import {ClientRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/client.repository.adapter';

export const makeUpdateClientFactory = (): UpdateClientService => {
    return new UpdateClientService(
        new ClientRepositoryAdapter()
    );
}
