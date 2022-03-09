import { Optional } from 'sequelize';

export type StatusTypeContract = 'Canceled' | 'Activated' | 'Paused';

export interface IContractRepository {
    id: number;
    companyId: number;
    clientId: number;
    serviceId: number;
    name: string,
    dateStart: string;
    dateEnd?: string;
    observation?: string;
    status: StatusTypeContract;
    canceledAt?: string;
    activatedAt: string;
    pausedAt?: string;
}

export interface IContractCreationRepository extends Optional<IContractRepository, 'id'> {}