import { Association, BelongsToGetAssociationMixin, DataTypes, Model } from 'sequelize';
import { IServiceCreationRepository, IServiceRepository } from './gateways/service.repository';
import {SequelizeHelper} from '@/infrastructure/driven-adapters/adapters/sequelize-adapter/sequelize-helper';
import { CompanyModel } from "./company.model";

const {sequelize} = SequelizeHelper;

export class ServiceModel extends Model<IServiceRepository, IServiceCreationRepository> implements IServiceRepository {
    public id!: number;
    public concept!: string;
    public price!: number;
    public icon?: string;
    public categoryId!: number;
    public companyId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getCompany!: BelongsToGetAssociationMixin<CompanyModel>;
    public readonly company!: CompanyModel;

    public static associations: {
        company: Association<ServiceModel, CompanyModel>
    };

}

ServiceModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        field: 'category_id',
        allowNull: false,
    },
    companyId: {
        type: DataTypes.INTEGER,
        field: 'company_id',
        allowNull: false,
    },
    concept: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName: 'services',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    sequelize
});

ServiceModel.belongsTo(CompanyModel, {
    as: 'company',
    foreignKey: 'company_id'
});