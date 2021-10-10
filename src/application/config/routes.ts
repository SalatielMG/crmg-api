import {readdirSync} from "fs";
import {Express, Router} from "express";
import routes from '../routes/index';
import authRoutes from '@/application/routes/auth.router';

export default (app: Express): void => {
    // const router = Router()

    app.use('/api/v1', routes)
    // readdirSync(__dirname + '/../routes').map(async file => {
    //     if (!file.includes('.tests.') && !file.endsWith('.map')) {
    //         (await import("../routes/" + file)).default(router)
    //     }
    // })
}
