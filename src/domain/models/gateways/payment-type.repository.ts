import { Optional } from 'sequelize';

export interface IPaymentTypeRepository {
    id: number;
    companyId: number
    name: string;
    enabled: boolean;
}

export interface IPaymentTypeCreationRepository extends Optional<IPaymentTypeRepository, 'id'> {}