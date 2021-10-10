import {IGetPersonnelService} from '@/domain/use-cases/interfaces/personnel/get-personnel.service.interface';
import {PersonnelRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/personnel.repository.adapter';

export class GetPersonnelService implements IGetPersonnelService {

    constructor(
        private readonly personnelRepositoryAdapter: PersonnelRepositoryAdapter
    ) {
    }

    getPersonnel = async (personnelId: number): Promise<IGetPersonnelService.Result> => {
        const user = await this.personnelRepositoryAdapter.findByIdRepository(personnelId);
        if (user) {
            return {
                user
            }
        }
        return null;
    }
}
