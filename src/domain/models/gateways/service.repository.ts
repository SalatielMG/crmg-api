import { Optional } from 'sequelize';

export interface IServiceRepository {
    id: number,
    concept: string;
    price: number;
    icon?: string;
    categoryId: number;
    companyId: number;
}

export interface IServiceCreationRepository extends Optional<IServiceRepository, 'id'> {}