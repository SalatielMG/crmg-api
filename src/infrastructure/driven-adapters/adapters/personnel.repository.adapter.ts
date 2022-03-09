import {BaseRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/base.repository.adapter';
import {PersonnelModel} from '@/domain/models/personnel.model';
import {IPersonnelCreationRepository, IPersonnelRepository} from '@/domain/models/gateways/personnel.repository';

export class PersonnelRepositoryAdapter extends BaseRepositoryAdapter<IPersonnelRepository, IPersonnelCreationRepository, PersonnelModel> {
    constructor() {
        super(PersonnelModel);
    }
}
