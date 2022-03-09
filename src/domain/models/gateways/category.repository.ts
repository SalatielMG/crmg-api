import { Optional } from 'sequelize';

export interface ICategoryRepository {
    id: number;
    name: string;
    companyId: number;
}

export interface ICategoryCreationRepository extends Optional<ICategoryRepository, 'id'> {}