import {AuthenticationService} from '@/domain/use-cases/impl/authentication/authentication.service';
import {BcryptAdapter} from '@/infrastructure/driven-adapters/helpers/bcrypt-adapter';
import {JwtAdapter} from '@/infrastructure/driven-adapters/helpers/jwt-adapter';
import {SALT, SESSION_SECRET} from '@/application/config/environment';
import {PersonnelRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/personnel.repository.adapter';

export const makeAuthenticationFactory = (): AuthenticationService => {
    const bcryptAdapter = new BcryptAdapter(SALT);
    const jwtAdapter = new JwtAdapter(SESSION_SECRET);
    const personnelRepositoryAdapter = new PersonnelRepositoryAdapter();
    return new AuthenticationService(
        jwtAdapter,
        bcryptAdapter,
        personnelRepositoryAdapter
    );
}
