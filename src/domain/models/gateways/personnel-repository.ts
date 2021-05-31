import { Optional } from 'sequelize';

export interface IPersonnelRepository {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    address?: string;
    job: string;
    companyId: number;
}

export interface IPersonnelCreationRepository extends Optional<IPersonnelRepository, 'id'> {}
