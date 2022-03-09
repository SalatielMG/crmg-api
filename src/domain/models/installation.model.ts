import { SequelizeHelper } from '@/infrastructure/driven-adapters/adapters/sequelize-adapter/sequelize-helper';
import { Association, Model, DataTypes, BelongsToGetAssociationMixin } from 'sequelize';
import { CompanyModel } from './company.model';
import { ContractModel } from './contract.model';
import { IInstallationCreationRepository, IInstallationRepository } from './gateways/installation.repository';
import { ServiceModel } from './service.model';

const { sequelize } = SequelizeHelper;

export class InstallationModel extends Model<IInstallationRepository, IInstallationCreationRepository> implements IInstallationRepository {
    id!: number;
    companyId!: number;
    contractId!: number;
    serviceId!: number;
    date!: string;
    price!: number;
    busyMaterials?: string;
    busyPersonnel?: string;

    public readonly createdAt!: string;
    public readonly updatedAt!: string;

    public getCompany!: BelongsToGetAssociationMixin<CompanyModel>;
    public readonly company!: CompanyModel;

    public getContract!: BelongsToGetAssociationMixin<ContractModel>;
    public readonly contract!: ContractModel;
    
    public getService!: BelongsToGetAssociationMixin<ServiceModel>;
    public readonly service!: ServiceModel;

    public static associations: {
        company: Association<InstallationModel, CompanyModel>,
        contract: Association<InstallationModel, ContractModel>,
        service: Association<InstallationModel, ServiceModel>,
    }

}

InstallationModel.init({
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
    contractId: {
        type: DataTypes.INTEGER,
        field: 'contract_id',
        allowNull: false,
    },
    serviceId: {
        type: DataTypes.INTEGER,
        field: 'service_id',
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    busyMaterials: {
        type: DataTypes.STRING(1000),
        field: 'busy_materials',
        allowNull: true
    },
    busyPersonnel: {
        type: DataTypes.STRING(1000),
        field: 'busy_personnel',
        allowNull: true
    }
}, {
    timestamps: true,
    underscored: true,
    paranoid: true,
    tableName: 'installations',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    sequelize
});

InstallationModel.belongsTo(CompanyModel, {
    as: 'company',
    foreignKey: 'company_id'
});
InstallationModel.belongsTo(ContractModel, {
    as: 'contract',
    foreignKey: 'contract_id'
});
InstallationModel.belongsTo(ServiceModel, {
    as: 'service',
    foreignKey: 'service_id'
});