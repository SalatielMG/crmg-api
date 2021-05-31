import {readdirSync} from "fs";
import {Express, Router} from "express";

export default (app: Express): void => {
    const router = Router()
    app.use('/api/v1', router)
    readdirSync(__dirname + '/../routes').map(async file => {
        if (!file.includes('.tests.') && !file.endsWith('.map')) {
            (await import("../routes/" + file)).default(router)
        }
    })
}