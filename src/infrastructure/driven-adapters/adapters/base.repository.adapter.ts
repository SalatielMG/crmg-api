import {
    Model,
    FindOptions,
    WhereOptions,
    ModelCtor,
    UpdateOptions,
    CreateOptions, DestroyOptions,
} from 'sequelize';

export interface IBaseRepositoryAdapter<TIRepository, TIRepositoryCreate, TModel extends Model> {
    findAllRepository: (options?: FindOptions<TIRepository>) => Promise<TModel[]>;
    findByIdRepository: (id: number, options?: FindOptions<TIRepository>) => Promise<TModel>;
    findOneRepository: (where: Partial<TIRepository> | WhereOptions, options?: FindOptions<TIRepository>) => Promise<TModel>;
    createRepository: (dataCreate: TIRepositoryCreate, options?: CreateOptions<TIRepository>) => Promise<TModel>;
    updateByIdRepository: (id: number, dataUpdate: Partial<TIRepository>, options?: UpdateOptions<TIRepository>)=> Promise<TModel>;
    destroyByIdRepository: (id: number, options?: DestroyOptions<TIRepository>) => Promise<TModel>;
}

export abstract class BaseRepositoryAdapter<TIRepository, TIRepositoryCreate, TModel extends Model>
    implements IBaseRepositoryAdapter<TIRepository, TIRepositoryCreate, TModel> {

    model: ModelCtor<TModel>;

    constructor(model: any) {
        this.model = model;
    }

    findAllRepository = (options?: FindOptions<TIRepository>) => {
        return this.model.findAll(options);
    }

    findByIdRepository = async (id: number, options?: FindOptions<TIRepository>): Promise<TModel> => {
        return this.model.findByPk(id, options);
    };

    findOneRepository = async (where: (Partial<TIRepository> | WhereOptions), options?: FindOptions<TIRepository>): Promise<TModel> => {
        let optionsFind = {
            ... (options ? options : {}),
            where
        };
        return this.model.findOne(optionsFind);
    }

    createRepository = async (dataCreate: TIRepositoryCreate, options?: CreateOptions<TIRepository>) => {
        return this.model.create(dataCreate, options)
    }

    updateByIdRepository = async (id: number, dataUpdate: Partial<TIRepository>, options?: UpdateOptions<TIRepository>): Promise<TModel> => {
        let optionsUpdate = {
            ... (options ? options : {}),
            where: {
                id
            }
        };
        await this.model.update(dataUpdate, optionsUpdate);
        return this.findByIdRepository(id);
    }

    updateOneRepository = async (where: (Partial<TIRepository> | WhereOptions), dataUpdate: Partial<TIRepository>, options?: UpdateOptions<TIRepository>) => {
        let optionsUpdate = {
            ... (options ? options : {}),
            where
        };
        await this.model.update(dataUpdate, optionsUpdate);
        return this.findOneRepository(where);
    }

    destroyByIdRepository = async (id: number, options?: DestroyOptions<TIRepository>): Promise<TModel> => {
        let optionsDestroy = {
            ... (options ? options : {}),
            where: {
                id
            }
        }
        await this.model.destroy(optionsDestroy);
        return await this.findOneRepository({
            id            
        }, {
            paranoid: false
        });
    }

}
