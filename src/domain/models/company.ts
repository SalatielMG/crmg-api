import { DataTypes, Model} from 'sequelize';
import { ICompanyCreationRepository, ICompanyRepository } from '@/domain/models/gateways/company-repository';
import { SequelizeHelper } from "@/infrastructure/driven-adapters/adapters/sequelize-adapter/sequelize-helper";
const { sequelize } = SequelizeHelper;

export type CompanyModel = {
    // Attributes
}

export type AddCompanyParams = Omit<CompanyModel, 'id'>

export class Company extends Model<ICompanyRepository, ICompanyCreationRepository>
implements ICompanyRepository
{
    public id!: number;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

Company.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'companies',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        sequelize
    }
)
