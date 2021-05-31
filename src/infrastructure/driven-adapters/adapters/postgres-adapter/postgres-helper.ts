import {Pool} from 'pg'
import {CONFIG_POSTGRES} from "@/application/config/environment";

export const PostgresHelper = {
    connection: null,

    async connect(): Promise<void> {
        this.connection = new Pool(CONFIG_POSTGRES)

        await this.connection.connect((err, result) => err ? console.log(err) : console.log("Connected Postgres."))
    },

    async disconnect():Promise<void> {
        this.connection.close()
    }
}
