import {IActionController} from '@/infrastructure/entry-points/gateways/action-controller';
import {IResourceController} from '@/infrastructure/entry-points/gateways/resource-controller';
import {HttpRequest, HttpRequestMethod, HttpResponse, notFound, ok} from '@/infrastructure/helpers/http';


export abstract class ActionResourceController implements IActionController, IResourceController {

    action: string = null;

    method: HttpRequestMethod = null;

    protected constructor (action?: string) {
        if (action) this.action = action;
    }

    handle = async (request: HttpRequest): Promise<HttpResponse> => {
        console.log('ActionResourceController', this.action);
        return await (this.action) ? this.handleAction(request) : this.handleResource(request);
    };

    abstract handleAction = async (request: HttpRequest): Promise<HttpResponse> => {
        switch (this.action) {
            default: return notFound();
        }
    };

    handleResource = async (request: HttpRequest): Promise<HttpResponse> => {
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
