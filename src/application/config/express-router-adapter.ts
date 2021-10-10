import {NextFunction, Request, Response} from 'express'
import {HttpRequest, HttpResponse} from '@/infrastructure/helpers/http';
import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {INTERNAL_SERVER_ERROR} from '@/infrastructure/helpers/constant';

export const adaptRoute = (controller: IController) => {
    return async (req: Request, res: Response) => {
        try {

            // @ts-ignore
            const httpRequest: HttpRequest = {
                ...req
            }

            const httpResponse = await controller.handle(httpRequest)

            return handleResponse({
                res,
                httpResponse
            });

        } catch (error) {

            return handleResponse({
                res,
                httpResponse: {
                    statusCode: 500,
                    body: error
                }
            });

        }
    }
}

interface IParamsHandleError {
    req?: Request
    res: Response,
    next?: NextFunction,
    httpResponse: HttpResponse
}

export const handleResponse = ({httpResponse, next, res, req}: IParamsHandleError) => {
    const {statusCode, body} = httpResponse;
    console.log('body handleResponse', body);
    if (statusCode === 500) {
        console.error('Internal Error', httpResponse);
        return res.status(500).json({
            success: false,
            message: INTERNAL_SERVER_ERROR
        })
    }
    if (statusCode >= 200 && statusCode <= 299) {
        console.log('next handleResponse', next);
        if (!next) {
            return res.status(statusCode).json(body);
        }
        // Object.assign(req, body);
        return next();
        // return (!next)
        //     ?
        //     : next();
    } else {
        console.error('error', body);
        return res.status(statusCode)
            .json({
                success: false,
                message: body.message
            })
    }
}
