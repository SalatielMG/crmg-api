import { Optional } from 'sequelize';

export interface IInstallationRepository {
    id: number;
    companyId: number;
    contractId: number;
    serviceId: number;
    date: string;
    price: number;
    busyMaterials?: string;
    busyPersonnel?: string;
}

export interface IInstallationCreationRepository extends Optional<IInstallationRepository, 'id'> {}