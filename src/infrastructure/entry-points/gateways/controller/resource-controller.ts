import {IController} from '@/infrastructure/entry-points/gateways/controller';
import {HttpRequest, HttpRequestMethod, HttpResponse, notFound, ok} from '@/infrastructure/helpers/http';


export interface IResourceController extends IController {
    method: HttpRequestMethod;
    create: (request: HttpRequest) => Promise<HttpResponse>;
    read: (request: HttpRequest) => Promise<HttpResponse>;
    update: (request: HttpRequest) => Promise<HttpResponse>;
    delete: (request: HttpRequest) => Promise<HttpResponse>;
}

export abstract class ResourceController implements IResourceController {

    method: HttpRequestMethod = null;

    handle = async (request: HttpRequest): Promise<HttpResponse> => {
        this.method = request.method;
        switch (this.method) {
            case 'POST':
                return await this.create(request);
            case 'GET':
                return await this.read(request);
            case 'PUT':
                return await this.update(request);
            case 'DELETE':
                return await this.delete(request);
            default: return notFound();
        }
    }

    abstract create = async (request: HttpRequest): Promise<HttpResponse> => {
        // Code
        return ok({
            success: true,
            message: 'Created Success'
        });
    };

    abstract read = async (request: HttpRequest): Promise<HttpResponse> => {
        // Code
        return ok({
            success: true
        });
    };

    abstract update = async (request: HttpRequest): Promise<HttpResponse> => {
        // Code
        return ok({
            success: true,
            message: 'Updated Success'
        });
    };

    abstract delete = async (request: HttpRequest): Promise<HttpResponse> => {
        // Code
        return ok({
            success: true,
            message: 'Deleted Success'
        });
    };

}
