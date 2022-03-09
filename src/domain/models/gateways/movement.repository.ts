import { Optional } from 'sequelize/types';

export type MovementType = '+'| '-';

export interface IMovementRepository {
    id: number;
    companyId: number;
    movableId: number;
    movableType: string;
    paymentTypeId: number;
    description?: string
    amount: number;
    type: MovementType;
    date: string;
}

export interface IMovementCreationRepository extends Optional<IMovementRepository, 'id'> {}