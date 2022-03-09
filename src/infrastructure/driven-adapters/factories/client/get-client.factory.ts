import {GetClientService} from '@/domain/use-cases/impl/client/get-client.service';
import {ClientRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/client.repository.adapter';

export const makeGetClient = (): GetClientService => {
    return new GetClientService(
        new ClientRepositoryAdapter()
    );
}
