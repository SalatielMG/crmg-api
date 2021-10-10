import {Optional} from 'sequelize';

export interface IInvitationRepository {
    id: number;
    userId?: number;
    email?: string;
    prefix?: string;
    phoneNumber?: string;
    type: string,
    token: string;
    expiredDate?: Date;
    verifiedAt?: Date;
}

export interface IInvitationCreationRepository extends Optional<IInvitationRepository, 'id'> {}
