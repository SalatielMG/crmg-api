import {IMiddleware} from '@/infrastructure/entry-points/gateways/middleware';
import {NextFunction, Request, Response} from 'express';
import {handleResponse} from '@/application/config/express-router-adapter';
import {badRequest, unauthorized} from '@/infrastructure/helpers/http';

export const authMiddlewareAdapter = (middleware: IMiddleware<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log('next authMiddlewareAdapter', next);
        try {
            console.log('req.headers', req.headers);
            if (!req.headers.authorization) {
                return handleResponse({
                    res,
                    next,
                    httpResponse: badRequest('No token provided')
                })
            }

            const httpResponse = await middleware.handle(req);
            console.log('httpResponse', httpResponse);

            if (httpResponse.statusCode === 200) {
                Object.assign(req, httpResponse.body)
                next()
            } else {
                res.status(httpResponse.statusCode).json({error: httpResponse.body.message})
            }

            // return handleResponse({
            //     req,
            //     res,
            //     next,
            //     httpResponse
            // });

        } catch (error) {
            return handleResponse({
                res,
                next,
                httpResponse: unauthorized('Unauthorized')
            });
        }
    }
}
