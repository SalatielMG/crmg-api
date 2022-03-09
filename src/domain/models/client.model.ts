import {Association, BelongsToGetAssociationMixin, DataTypes, Model} from 'sequelize';
import {IClientCreationRepository, IClientRepository} from '@/domain/models/gateways/client.repository';
import {CompanyModel} from '@/domain/models/company.model';
import {PersonnelModel} from '@/domain/models/personnel.model';
import {SequelizeHelper} from '@/infrastructure/driven-adapters/adapters/sequelize-adapter/sequelize-helper';

const {sequelize} = SequelizeHelper;

export class ClientModel extends Model<IClientRepository, IClientCreationRepository>
    implements IClientRepository {
    public id!: number;
    public companyId!: number;
    public name!: string;
    public firstName!: string;
    public lastName!: string;
    public email?: string;
    public address?: string;
    public phoneNumber!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getCompany!: BelongsToGetAssociationMixin<CompanyModel>;
    public readonly company!: CompanyModel;

    public static associations: {
        company: Association<ClientModel, CompanyModel>
    };

}

ClientModel.init({
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
    firstName: {
        type: DataTypes.STRING,
        field: 'first_name',
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        field: 'last_name',
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        field: 'phone_number',
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName: 'clients',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    sequelize
});

ClientModel.belongsTo(CompanyModel, {
    as: 'company',
    foreignKey: 'company_id'
});
