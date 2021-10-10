import {IInvitationCreationRepository, IInvitationRepository} from '@/domain/models/gateways/invitation.repository';
import {UserModel} from '@/domain/models/user.model';
import {Association, BelongsToGetAssociationMixin, DataTypes, Model} from 'sequelize';
import {SequelizeHelper} from "@/infrastructure/driven-adapters/adapters/sequelize-adapter/sequelize-helper";

const { sequelize } = SequelizeHelper;
export type IInvitationModel = {

}

export type AddInvitationParams = Omit<IInvitationModel, 'id'>

export class InvitationModel extends Model<IInvitationRepository, IInvitationCreationRepository>
implements IInvitationRepository
{
  public id!: number;
  public userId?: number;
  public email?: string;
  public prefix?: string;
  public phoneNumber?: string;
  public type!: string;
  public token!: string;
  public expiredDate?: Date;
  public verifiedAt?: Date;

  public getUser: BelongsToGetAssociationMixin<UserModel>;
  public readonly user?: UserModel;
  public static associations: {
    user: Association<InvitationModel, UserModel>
  }
}

InvitationModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prefix: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    field: 'phone_number',
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiredDate: {
    type: DataTypes.DATE,
    field: 'expired_date',
    allowNull: true
  },
  verifiedAt: {
    type: DataTypes.DATE,
    field: 'verified_at',
    allowNull: true
  }
}, {
  timestamps: true,
  underscored: true,
  tableName: 'invitations',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  sequelize
});

InvitationModel.belongsTo(UserModel, {
  as: 'user',
  foreignKey: {
    name: 'user_id',
    allowNull: true
  },
});
