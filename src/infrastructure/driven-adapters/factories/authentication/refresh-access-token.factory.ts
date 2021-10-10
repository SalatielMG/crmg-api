import {BcryptAdapter} from '@/infrastructure/driven-adapters/helpers/bcrypt-adapter';
import {SALT, SESSION_SECRET} from '@/application/config/environment';
import {JwtAdapter} from '@/infrastructure/driven-adapters/helpers/jwt-adapter';
import {PersonnelRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/personnel.repository.adapter';
import {RefreshAccessTokenService} from '@/domain/use-cases/impl/authentication/refresh-access-token.service';

export const makeRefreshAccessTokenFactory = (): RefreshAccessTokenService => {
    const bcryptAdapter = new BcryptAdapter(SALT);
    const jwtAdapter = new JwtAdapter(SESSION_SECRET);
    const personnelRepositoryAdapter = new PersonnelRepositoryAdapter();
    return new RefreshAccessTokenService(
        jwtAdapter,
        bcryptAdapter,
        personnelRepositoryAdapter
    );
}
