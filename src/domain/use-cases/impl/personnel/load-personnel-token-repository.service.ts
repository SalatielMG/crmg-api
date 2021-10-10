import {ILoadPersonnelTokenRepositoryService} from '@/domain/use-cases/interfaces/personnel/load-personnel-token-repository.service.interface';
import {IPersonnelRepository} from '@/domain/models/gateways/personnel.repository';
import {JwtAdapter} from '@/infrastructure/driven-adapters/helpers/jwt-adapter';
import {PersonnelRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/personnel.repository.adapter';

export class LoadPersonnelTokenRepositoryService implements ILoadPersonnelTokenRepositoryService {

    constructor(
        private readonly jwtAdapter: JwtAdapter,
        private readonly personnelRepositoryAdapter: PersonnelRepositoryAdapter
    ) {
    }

    loadPersonnelByToken = async (accessToken: string): Promise<ILoadPersonnelTokenRepositoryService.Result> => {
        let personnel: IPersonnelRepository
        try {
            personnel = await this.jwtAdapter.decrypt(accessToken);
        } catch (error) {
            return null;
        }
        if (personnel) {
            personnel = await this.personnelRepositoryAdapter.findByIdRepository(personnel.id, {
                attributes: [
                    'id',
                    'name',
                    'firstName',
                    'lastName',
                    'job',
                    'phoneNumber',
                    'rol',
                    'email',
                ],
                raw: true,
                nest: true
            });
            if (personnel) {
                return {
                    personnel
                };
            }
        }
        return null;
    }
}
