import {UserModel} from '@/domain/models/user.model';
import {IUserCreationRepository, IUserRepository} from '@/domain/models/gateways/user.repository';
import {BaseRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/base.repository.adapter';

export class UserRepositoryAdapter extends BaseRepositoryAdapter<IUserRepository, IUserCreationRepository, UserModel>{
    constructor() {
        super(UserModel)
    }
}
