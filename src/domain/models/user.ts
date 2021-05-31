import { SequelizeHelper } from '@/infrastructure/driven-adapters/adapters/sequelize-adapter/sequelize-helper';
import {
    Association, BelongsToGetAssociationMixin,
    DataTypes, HasOneGetAssociationMixin,
    Model
} from 'sequelize';
import {Company} from '@/domain/models/company';
import {IUserCreationRepository, IUserRepository} from "./gateways/user-repository";
import {Personnel} from "./personnel";
const { sequelize } = SequelizeHelper;

export type UserModel = {

};

export type AddUserParams = Omit<UserModel, 'id'>

export class User extends Model<IUserRepository, IUserCreationRepository>
implements IUserRepository
{
  public id!: number;
  public companyId!: number;
  public personnelId?: number | null;

  public email!: string;
  public username!: string;
  public password?: string | null;
  public avatar?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getCompany!: BelongsToGetAssociationMixin<Company>;
  public readonly company!: Company;

  public getPersonnel: HasOneGetAssociationMixin<Personnel>;
  public readonly personnel?: Personnel;

  public static asociations: {
      company: Association<Personnel, Company>,
      personnel: Association<User, Personnel>
  }

}

User.init(
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
      personnelId: {
        type: DataTypes.INTEGER,
        field: 'personnel_id',
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      password: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      avatar: {
          type: DataTypes.STRING,
          allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true,
      tableName: 'users',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      sequelize
    }
)

User.belongsTo(Company, {
    as: 'company',
    'foreignKey': 'company_id'
});

User.belongsTo(Personnel, {
    as: 'personnel',
    'foreignKey': 'personnel_id'
});
