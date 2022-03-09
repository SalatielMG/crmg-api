import { SequelizeHelper } from '@/infrastructure/driven-adapters/adapters/sequelize-adapter/sequelize-helper';
import { Association, Model, DataTypes } from 'sequelize';
import { CompanyModel } from './company.model';
import { IMovementCreationRepository, IMovementRepository, MovementType } from './gateways/movement.repository';

const { sequelize } = SequelizeHelper;

export class MovementModel extends Model<IMovementRepository, IMovementCreationRepository> implements IMovementRepository {
    id!: number;
    companyId!: number;
    movableId!: number;
    movableType!: string;
    paymentTypeId!: number;
    description?: string;
    amount!: number;
    type!: MovementType;
    date!: string;

    public readonly createdAt!: string;
    public readonly updatedAt!: string;

    public static associations: {
        company: Association<MovementModel, CompanyModel>,
    }

}

MovementModel.init({
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
    movableId: {
        type: DataTypes.INTEGER,
        field: 'movable_id',
        allowNull: false,
    },
    movableType: {
        type: DataTypes.STRING,
        field: 'movable_type',
        allowNull: false,
    },
    paymentTypeId: {
        type: DataTypes.INTEGER,
        field: 'payment_type_id',
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    type: {
        type: DataTypes.CHAR,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    timestamps: true,
    underscored: true,
    paranoid: true,
    tableName: 'movements',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    sequelize
});

MovementModel.belongsTo(CompanyModel, {
    as: 'company',
    foreignKey: 'company_id'
})