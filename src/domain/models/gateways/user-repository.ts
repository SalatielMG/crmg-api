import {Optional} from 'sequelize';

export interface IUserRepository {
    id: number;
    username: string;
    email: string;
    password?: string | null;
    avatar?: string | null;
    companyId: number;
    personnelId?: number | null;
}

export interface IUserCreationRepository extends Optional<IUserRepository, 'id'> {}
