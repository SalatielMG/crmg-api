import 'module-alias/register'
import fs from "fs"
import dotenv from "dotenv"
import {PORT} from "@/application/config/environment";
// import {PostgresHelper} from "@/infrastructure/driven-adapters/adapters/postgres-adapter/postgres-helper";
import {SequelizeHelper} from "@/infrastructure/driven-adapters/adapters/sequelize-adapter/sequelize-helper";

if (fs.existsSync(".env")) dotenv.config({ path: ".env" })

SequelizeHelper.connect().then(async () => {
    const app = (await import('./config/app')).default
    app.listen(PORT, () => console.log("Server an running on port: " + PORT))
}).catch(err => console.error('error server running', err))
