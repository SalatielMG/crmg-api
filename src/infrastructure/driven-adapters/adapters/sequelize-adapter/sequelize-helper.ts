import { Sequelize } from "sequelize";
import { CONFIG_SEQUELIZE } from "@/application/config/environment";

export const SequelizeHelper = {
    sequelize: null,
    async connect(): Promise<void> {
        this.sequelize = await new Sequelize(
            CONFIG_SEQUELIZE.database,
            CONFIG_SEQUELIZE.username,
            CONFIG_SEQUELIZE.password,
            CONFIG_SEQUELIZE
            );
    }
}

function syncModel() {

}
