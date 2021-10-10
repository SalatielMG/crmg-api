import {BaseRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/base.repository.adapter';
import {PersonnelModel} from '@/domain/models/personnel.model';
import {IPersonnelRepository} from '@/domain/models/gateways/personnel.repository';

export class PersonnelRepositoryAdapter extends BaseRepositoryAdapter<IPersonnelRepository, PersonnelModel> {
    constructor() {
        super(PersonnelModel);
    }

    // findOneRepository = async (where: (Partial<IPersonnelRepository> | WhereOptions), options?: FindOptions<PersonnelModel>): Promise<PersonnelModel> => {
    //     let optionsFind = {
    //         ... (options ? options : {}),
    //         where
    //     }
    //     return PersonnelModel.findOne(optionsFind);
    // };
    // updateByIdRepository: <TIRepository, TModel>(id: number, data: Partial<TIRepository>) => Promise<[number, TModel[]]>;
}
