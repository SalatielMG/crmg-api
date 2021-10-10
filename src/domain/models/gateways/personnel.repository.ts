import { Optional } from 'sequelize';

/**
 * @email : Unique by company
 * */
export interface IPersonnelRepository {
    id: number;
    companyId: number;
    name: string;
    firstName: string;
    lastName: string;
    address?: string;
    job: string;
    phoneNumber?: string;
    rol: string;
    email: string;
    password?: string;
}

export interface IPersonnelCreationRepository extends Optional<IPersonnelRepository, 'id'> {}
