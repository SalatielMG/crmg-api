import { Optional } from 'sequelize';

export type MonthlyPaymentStatus = 
'Pending' |
'Paused' |
'Canceled' | 
'Paid';

export interface IMonthlyPaymentRepository {
    id: number;
    companyId: number;
    contractId: number;
    month: number;
    year: number;
    price: number;
    status: MonthlyPaymentStatus;
}

export interface IMonthlyPaymentCreationRepository extends Optional<IMonthlyPaymentRepository, 'id'> {}