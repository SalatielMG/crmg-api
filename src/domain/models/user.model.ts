import { SequelizeHelper } from '@/infrastructure/driven-adapters/adapters/sequelize-adapter/sequelize-helper';
import {
    Association, BelongsToGetAssociationMixin,
    DataTypes, HasOneGetAssociationMixin,
    Model
} from 'sequelize';
import {IUserCreationRepository, IUserRepository} from "./gateways/user.repository";
const { sequelize } = SequelizeHelper;

export type AddUserParams = Omit<IUserRepository, 'id'>

export class UserModel extends Model<IUserRepository, IUserCreationRepository>
implements IUserRepository
{
  public id!: number;

  public email!: string;
  public username!: string;
  public password?: string | null;
  public avatar?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  //
  // public getCompany!: BelongsToGetAssociationMixin<CompanyModel>;
  // public readonly company!: CompanyModel;
  //
  // public getPersonnel: HasOneGetAssociationMixin<PersonnelModel>;
  // public readonly personnel?: PersonnelModel;
  //
  // public static associations: {
  //     company: Association<UserModel, CompanyModel>,
  //     personnel: Association<PersonnelModel, UserModel>
  // }

}

UserModel.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      // companyId: {
      //   type: DataTypes.INTEGER,
      //   field: 'company_id',
      //   allowNull: false,
      // // },
      // personnelId: {
      //   type: DataTypes.INTEGER,
      //   field: 'personnel_id',
      //   allowNull: false,
      // },
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

// UserModel.belongsTo(CompanyModel, {
//     as: 'company',
//     foreignKey: 'company_id'
// });

// UserModel.belongsTo(PersonnelModel, {
//     as: 'personnel',
//     foreignKey: 'personnel_id'
// });
