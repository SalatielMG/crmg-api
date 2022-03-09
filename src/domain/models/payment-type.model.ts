import { SequelizeHelper } from '@/infrastructure/driven-adapters/adapters/sequelize-adapter/sequelize-helper';
import { Association, BelongsToGetAssociationMixin, Model, DataTypes } from 'sequelize';
import { CompanyModel } from './company.model';
import { IPaymentTypeCreationRepository, IPaymentTypeRepository } from './gateways/payment-type.repository';

const { sequelize } = SequelizeHelper;

export class PaymentTypeModel extends Model<IPaymentTypeRepository, IPaymentTypeCreationRepository> implements IPaymentTypeRepository {
    id!: number;
    companyId!: number;
    name!: string;
    enabled!: boolean;

    public readonly createdAt!: string;
    public readonly updatedAt!: string;

    public getCompany!: BelongsToGetAssociationMixin<CompanyModel>;
    public readonly company!: CompanyModel;

    public static associations: {
        company: Association<PaymentTypeModel, CompanyModel>,
    }

}

PaymentTypeModel.init({
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
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    timestamps: true,
    underscored: true,
    paranoid: true,
    tableName: 'payment_types',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    sequelize
});

PaymentTypeModel.belongsTo(CompanyModel, {
    as: 'company',
    foreignKey: 'company_id'
})