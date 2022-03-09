import {IMiddleware} from '@/infrastructure/entry-points/gateways/middleware';
import {NextFunction, Request, Response} from 'express';
import {handleResponse} from '@/application/config/express-router-adapter';
import {badRequest, unauthorized} from '@/infrastructure/helpers/http';

export const authMiddlewareAdapter = (middleware: IMiddleware<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // console.log('next authMiddlewareAdapter', next);
        try {
            // console.log('req.headers', req.headers);
            if (!req.headers.authorization) {
                return handleResponse({
                    res,
                    next,
                    httpResponse: badRequest('No token provided')
                })
            }

            const httpResponse = await middleware.handle(req);
            // console.log('httpResponse', httpResponse);

            if (httpResponse.statusCode === 200) {
                Object.assign(req, httpResponse.body)
                next()
            } else {
                return res.status(httpResponse.statusCode).json(httpResponse.body)
            }

        } catch (error) {
            return handleResponse({
                res,
                next,
                httpResponse: unauthorized('Unauthorized')
            });
        }
    }
}

export const validateMiddlewareAdapter = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate({
            body: req.body,
            params: req.params
        });
        next();
    } catch (error) {
        // console.error('error validate schema yup', error);
        // type: err.name, message:
        return handleResponse({
            res,
            next,
            httpResponse: badRequest(error.message)
        });
    }
}

export const middlewareAdapter = (middleware: IMiddleware<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const httpResponse = await middleware.handle(req);
            console.log('before middlewareAdapter httpResponse.statusCode', httpResponse.statusCode);

            if (httpResponse.statusCode === 200) {
                // req = {
                //     ...req,
                //     ...httpResponse.body
                // }
                Object.assign(req, httpResponse.body)
                console.log('after middlewareAdapter req.params', req.params);
                next();
            } else {
                console.log('Error middleware httpResponse', httpResponse);
                return res.status(httpResponse.statusCode).json(httpResponse.body)
            }

        } catch (error) {
            return handleResponse({
                res,
                next,
                httpResponse: {
                    statusCode: 500,
                    body: error
                }
            });
        }
    }
}
