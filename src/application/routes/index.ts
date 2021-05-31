import {Request, Response, Router} from "express";

/**
 * Base router "/api/v1"
 * @param router
 */
export default (router: Router): void => {
    router.get('/', (req: Request, res: Response) => {
        res.json("Welcome to the world of clean architecture.")
    })
}