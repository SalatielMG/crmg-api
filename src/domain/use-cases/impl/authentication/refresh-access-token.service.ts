import {IRefreshAccessTokenService} from '@/domain/use-cases/interfaces/authentication/refresh-access-token.service.interface';
import {JwtAdapter} from '@/infrastructure/driven-adapters/helpers/jwt-adapter';
import {BcryptAdapter} from '@/infrastructure/driven-adapters/helpers/bcrypt-adapter';
import {PersonnelRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/personnel.repository.adapter';
import {IPersonnelRepository} from '@/domain/models/gateways/personnel.repository';

export class RefreshAccessTokenService implements IRefreshAccessTokenService {
    constructor (
        private readonly jwtAdapter: JwtAdapter,
        private readonly bcryptAdapter: BcryptAdapter,
        private readonly personnelRepositoryAdapter: PersonnelRepositoryAdapter
    ) {
    }
    refreshAccessToken = async ({accessToken}: IRefreshAccessTokenService.Params): Promise<IRefreshAccessTokenService.Result> => {
        let user: IPersonnelRepository
        try {
            user = await this.jwtAdapter.decrypt(accessToken);
        } catch (error) {
            return null;
        }
        if (user) {
            user = await this.personnelRepositoryAdapter.findByIdRepository(user.id, {
                attributes: [
                    'id',
                    'name',
                    'firstName',
                    'lastName',
                    'job',
                    'phoneNumber',
                    'rol',
                    'email',
                    'password',
                ],
                raw: true,
                nest: true
            });
            if (user) {
                accessToken = await this.jwtAdapter.encrypt(user);
                return {
                    accessToken,
                    user
                };
            }
        }
        return null;
    }
}
