import {UserModel} from '@/domain/models/user.model';
import {IUserRepository} from '@/domain/models/gateways/user.repository';
import {FindOptions} from 'sequelize';
import {BaseRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/base.repository.adapter';

export class UserRepositoryAdapter extends BaseRepositoryAdapter<IUserRepository, UserModel>{
    // findOneByFieldRepository = async (where: Partial<IUserRepository>, options?: FindOptions<IUserRepository>): Promise<UserModel> => {
    //     let optionsFind = {
    //         ... (options ? options: {}),
    //         where
    //     };
    //     return UserModel.findOne(optionsFind);
    // }
    // updateByIdRepository =  async (id: number, data: Partial<IUserRepository>): Promise<[number, UserModel[]]> => {
    //     return UserModel.update(data, {
    //         where: {
    //             id
    //         }
    //     });
    // }
}
