import {Optional} from 'sequelize';

export interface IUserRepository {
    id: number;
    username: string;
    email: string;
    password?: string | null;
    avatar?: string | null;
}

export interface IUserCreationRepository extends Optional<IUserRepository, 'id'> {}
