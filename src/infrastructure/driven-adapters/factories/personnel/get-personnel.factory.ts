import {GetPersonnelService} from '@/domain/use-cases/impl/personnel/get-personnel.service';
import {PersonnelRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/personnel.repository.adapter';

export const makeGetPersonnelFactory = (): GetPersonnelService => {
    return new GetPersonnelService(
        new PersonnelRepositoryAdapter()
    )
}
