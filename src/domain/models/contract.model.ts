import { Association, BelongsToGetAssociationMixin, DataTypes, Model } from 'sequelize';
import { ClientModel } from './client.model';
import { CompanyModel } from './company.model';
import { IContractCreationRepository, IContractRepository, StatusTypeContract } from './gateways/contract.repository';

import {SequelizeHelper} from '@/infrastructure/driven-adapters/adapters/sequelize-adapter/sequelize-helper';
import { ServiceModel } from './service.model';

const { sequelize } = SequelizeHelper;

export class ContractModel extends Model<IContractRepository, IContractCreationRepository> implements IContractRepository {
    public id!: number;
    public companyId!: number;
    public clientId!: number;
    public serviceId!: number;
    public name!: string;
    public dateStart!: string;
    public dateEnd?: string;
    public observation?: string;
    public status!: StatusTypeContract;
    public canceledAt?: string;
    public activatedAt!: string;
    public pausedAt?: string;

    public readonly createdAt!: string;
    public readonly updatedAt!: string;

    public getCompany!: BelongsToGetAssociationMixin<CompanyModel>;
    public readonly company!: CompanyModel;

    public getClient!: BelongsToGetAssociationMixin<ClientModel>;
    public readonly client!: ClientModel;

    public getService!: BelongsToGetAssociationMixin<ServiceModel>;
    public readonly service!: ServiceModel;

    public static associations: {
        company: Association<ContractModel, CompanyModel>,
        client: Association<ContractModel, ClientModel>,
        service: Association<ContractModel, ServiceModel>
    };

}

ContractModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    companyId: {
        type: DataTypes.INTEGER,
        field: 'company_id',
        allowNull: false,
    },
    clientId: {
        type: DataTypes.INTEGER,
        field: 'client_id',
        allowNull: false,
    },
    serviceId: {
        type: DataTypes.INTEGER,
        field: 'service_id',
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateStart: {
        type: DataTypes.DATE,
        field: 'date_start',
        allowNull: false
    },
    dateEnd: {
        type: DataTypes.DATE,
        field: 'date_end',
        allowNull: true
    },
    observation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    canceledAt: {
        type: DataTypes.DATE,
        field: 'canceled_at',
        allowNull: true
    },
    activatedAt: {
        type: DataTypes.DATE,
        field: 'activated_at',
        allowNull: false
    },
    pausedAt: {
        type: DataTypes.DATE,
        field: 'paused_at',
        allowNull: true
    },
}, {
    timestamps: true,
    underscored: true,
    paranoid: true,
    tableName: 'contracts',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    sequelize
});

ContractModel.belongsTo(CompanyModel, {
    as: 'company',
    foreignKey: 'company_id'
});
ContractModel.belongsTo(ClientModel, {
    as: 'client',
    foreignKey: 'client_id'
});
ContractModel.belongsTo(ServiceModel, {
    as: 'service',
    foreignKey: 'service_id'
});