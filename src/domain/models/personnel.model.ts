import {SequelizeHelper} from '@/infrastructure/driven-adapters/adapters/sequelize-adapter/sequelize-helper';
import {IPersonnelCreationRepository, IPersonnelRepository} from '@/domain/models/gateways/personnel.repository';
import {
    Association,
    BelongsToGetAssociationMixin,
    DataTypes,
    Model
} from 'sequelize';
import {CompanyModel} from './company.model';
import {UserModel} from './user.model';

const {sequelize} = SequelizeHelper;

export type AddPersonnelParams = Omit<IPersonnelRepository, 'id'>

export class PersonnelModel extends Model<IPersonnelRepository, IPersonnelCreationRepository>
    implements IPersonnelRepository {
    public id!: number;
    public companyId!: number;

    public name!: string;
    public firstName!: string;
    public lastName!: string;
    public job!: string;
    public address?: string;
    public phoneNumber?: string;
    public rol: string;
    public email: string;
    public password?: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getCompany!: BelongsToGetAssociationMixin<CompanyModel>;
    public readonly company!: CompanyModel;

    public static associations: {
        company: Association<PersonnelModel, CompanyModel>,
    };

}

PersonnelModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
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
        job: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            field: 'phone_number',
            allowNull: true,
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'personnels',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        sequelize
    }
);

PersonnelModel.belongsTo(CompanyModel, {
    as: 'company',
    foreignKey: 'company_id'
});

PersonnelModel.hasOne(UserModel, {
    as: 'user',
    sourceKey: 'id'
});

UserModel.belongsTo(PersonnelModel, {
    as: 'personnel',
    targetKey: 'id'
    // foreignKey: 'personnel_id'
});
