import {Model, FindOptions, WhereOptions, ModelDefined, ModelStatic, ModelCtor, UpdateOptions,} from 'sequelize';

export interface IBaseRepositoryAdapter<TIRepository, TModel extends Model> {
    findByIdRepository: (id: number, options?: FindOptions<TIRepository>) => Promise<TModel>;
    findOneRepository: (where: Partial<TIRepository> | WhereOptions, options?: FindOptions<TIRepository>) => Promise<TModel>;
    updateByIdRepository: (id: number, dataUpdate: Partial<TIRepository>, options?: UpdateOptions<TIRepository>)=> Promise<[number, TModel[]]>;
}

export abstract class BaseRepositoryAdapter<TIRepository, TModel extends Model>
    implements IBaseRepositoryAdapter<TIRepository, TModel> {

    model: ModelCtor<TModel>;

    constructor(model: any) {
        this.model = model;
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

    updateByIdRepository = async (id: number, dataUpdate: Partial<TIRepository>, options?: UpdateOptions<TIRepository>): Promise<[number, TModel[]]> => {
        let optionsUpdate = {
            ... (options ? options : {}),
            where: {
                id
            }
        };
        return this.model.update(dataUpdate, optionsUpdate);
    }

}
