import { SequelizeHelper } from '@/infrastructure/driven-adapters/adapters/sequelize-adapter/sequelize-helper';
import { IPersonnelCreationRepository, IPersonnelRepository } from '@/domain/models/gateways/personnel-repository';
import {
    Association,
    BelongsToGetAssociationMixin,
    DataTypes,
    Model
} from 'sequelize';
import {Company} from '@/domain/models/company';
import {User} from "@/domain/models/user";
const { sequelize } = SequelizeHelper;

export type PersonnelModel = {

}

export type AddPersonnelParams = Omit<PersonnelModel, 'id'>

export class Personnel extends Model<IPersonnelRepository, IPersonnelCreationRepository>
implements IPersonnelRepository
{
  public id!: number;
  public companyId!: number;

  public name!: string;
  public firstName: string;
  public lastName: string;
  public address?: string;
  public job!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getCompany!: BelongsToGetAssociationMixin<Company>;
  public readonly company!: Company;

  public static associations: {
      company: Association<Personnel, Company>,
      user: Association<Personnel, User>
  };

}

Personnel.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
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
        type: DataTypes.STRING
      },
      job: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyId: {
        type: DataTypes.INTEGER,
        field: 'company_id',
        allowNull: false,
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

Personnel.belongsTo(Company, {
    as: 'company',
    foreignKey: 'company_id'
});

Personnel.hasOne(User, {
    as: 'user',
    sourceKey: 'id'
});
