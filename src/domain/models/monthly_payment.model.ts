import { SequelizeHelper } from '@/infrastructure/driven-adapters/adapters/sequelize-adapter/sequelize-helper';
import { Association, BelongsToGetAssociationMixin, DataTypes, Model } from 'sequelize';
import { CompanyModel } from './company.model';
import { ContractModel } from './contract.model';
import { IMonthlyPaymentCreationRepository, IMonthlyPaymentRepository, MonthlyPaymentStatus } from './gateways/monthly_payment.repository';

const { sequelize } = SequelizeHelper;

export class MonthlyPaymentModel extends  Model<IMonthlyPaymentRepository, IMonthlyPaymentCreationRepository> implements IMonthlyPaymentRepository {
    id!: number;
    companyId!: number;
    contractId!: number;
    month!: number;
    year!: number;
    price!: number;
    status!: MonthlyPaymentStatus;

    public readonly createdAt!: string;
    public readonly updatedAt!: string;

    public getCompany!: BelongsToGetAssociationMixin<CompanyModel>;
    public readonly company!: CompanyModel;

    public getContract!: BelongsToGetAssociationMixin<ContractModel>;
    public readonly contract!: ContractModel;

    public static associations: {
        company: Association<MonthlyPaymentModel, CompanyModel>,
        contract: Association<MonthlyPaymentModel, ContractModel>,
    }

}

MonthlyPaymentModel.init({
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
    month: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    underscored: true,
    paranoid: true,
    tableName: 'monthly_payments',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    sequelize
});

MonthlyPaymentModel.belongsTo(CompanyModel, {
    as: 'company',
    foreignKey: 'company_id'
});
MonthlyPaymentModel.belongsTo(ContractModel, {
    as: 'contract',
    foreignKey: 'contract_id'
});