import {Optional} from 'sequelize';

export interface IClientRepository {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    address?: string;
    email?: string;
    phoneNumber: string;
    companyId: number;
}

export interface IClientCreationRepository extends Optional<IClientRepository, 'id'> {}
