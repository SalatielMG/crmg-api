import {
    Association,
    BelongsToGetAssociationMixin,
    DataTypes, Model } from 'sequelize';
import { ICategoryCreationRepository, ICategoryRepository } from './gateways/category.repository';
import {SequelizeHelper} from '@/infrastructure/driven-adapters/adapters/sequelize-adapter/sequelize-helper';
import { CompanyModel } from './company.model';

const {sequelize} = SequelizeHelper;

export class CategoryModel extends Model<ICategoryRepository, ICategoryCreationRepository> implements ICategoryRepository {
    public id!: number;
    public name!: string;
    public companyId!: number;;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getCompany!: BelongsToGetAssociationMixin<CompanyModel>;
    public readonly company!: CompanyModel;

    public static associations: {
        company: Association<CategoryModel, CompanyModel>
    };

}

CategoryModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    companyId: {
        type: DataTypes.INTEGER,
        field: 'company_id',
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName: 'categories',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    sequelize
});

CategoryModel.belongsTo(CompanyModel, {
    as: 'company',
    foreignKey: 'company_id'
});