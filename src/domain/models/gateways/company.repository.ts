import { Optional } from 'sequelize';

export interface ICompanyRepository {
    id: number;
    name: string;
}

export interface ICompanyCreationRepository extends Optional<ICompanyRepository, 'id'> {}
