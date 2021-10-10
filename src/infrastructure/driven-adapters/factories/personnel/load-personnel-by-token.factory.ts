import {LoadPersonnelTokenRepositoryService} from '@/domain/use-cases/impl/personnel/load-personnel-token-repository.service';
import {SESSION_SECRET} from '@/application/config/environment';
import {JwtAdapter} from '@/infrastructure/driven-adapters/helpers/jwt-adapter';
import {PersonnelRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/personnel.repository.adapter';

export const makeLoadPErsonnelByAccessTokenFactory = (): LoadPersonnelTokenRepositoryService => {
    return new LoadPersonnelTokenRepositoryService(
        new JwtAdapter(SESSION_SECRET),
        new PersonnelRepositoryAdapter()
    )
}
