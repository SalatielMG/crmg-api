import { GetService } from '@/domain/use-cases/impl/service/get-service.service';
import { ServiceRepositoryAdapter } from '../../adapters/service.repository.adapter';

export const makeGetServiceFactory = (): GetService => new GetService(
    new ServiceRepositoryAdapter()
)