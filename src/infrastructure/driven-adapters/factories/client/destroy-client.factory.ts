import {DestroyClientService} from '@/domain/use-cases/impl/client/destroy-client.service';
import {ClientRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/client.repository.adapter';

export const makeDestroyClientFactory = (): DestroyClientService => {
    return new DestroyClientService(
        new ClientRepositoryAdapter()
    )
}
