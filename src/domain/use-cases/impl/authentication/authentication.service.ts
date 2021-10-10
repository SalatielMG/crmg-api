import {IAuthenticationService} from '@/domain/use-cases/interfaces/authentication/authentication.service.interface';
import {BcryptAdapter} from '@/infrastructure/driven-adapters/helpers/bcrypt-adapter';
import {JwtAdapter} from '@/infrastructure/driven-adapters/helpers/jwt-adapter';
import {UserRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/user.repository.adapter';
import {PersonnelModel} from '@/domain/models/personnel.model';
import {CompanyModel} from '@/domain/models/company.model';
import {PersonnelRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/personnel.repository.adapter';

export class AuthenticationService implements IAuthenticationService {
    constructor (
        private readonly jwtAdapter: JwtAdapter,
        private readonly bcryptAdapter: BcryptAdapter,
        private readonly personnelRepositoryAdapter: PersonnelRepositoryAdapter
    ) {
    }
    auth = async (data: IAuthenticationService.Params): Promise<IAuthenticationService.Result> => {
        // @Code
        // Verificar si existe el usuario con ese email.
        let user = await this.personnelRepositoryAdapter.findOneRepository({
            email: data.email
        }, {
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
            // Validar si la contrasena es la proprcionada
            const isValid = await this.bcryptAdapter.compare(data.password, user.password);
            if (isValid) {
                const accessToken = await this.jwtAdapter.encrypt(user);
                delete user.password;
                return {
                    accessToken,
                    user
                }
            }
        }
        return null;
    }
}
