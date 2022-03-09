import {HttpRequest, HttpRequestMethod, HttpResponse, notFound, ok} from '@/infrastructure/helpers/http';
import {IActionController} from '@/infrastructure/entry-points/gateways/controller/action-controller';
import {IResourceController} from '@/infrastructure/entry-points/gateways/controller/resource-controller';

export abstract class ActionResourceController<T_Action> implements IActionController, IResourceController {

    action: T_Action = null;

    method: HttpRequestMethod = null;

    constructor (action?: T_Action) {
        if (action) this.action = action;
    }

    handle = async (request: HttpRequest): Promise<HttpResponse> => {
        console.log('request.params handleResource', request.params);
        return await (this.action) ? this.handleAction(request) : this.handleResource(request);
    };

    abstract handleAction: (request: HttpRequest) => Promise<HttpResponse>;

    handleResource = async (request: HttpRequest): Promise<HttpResponse> => {
        this.method = request.method;
        console.log('handleResource this.method', this.method);
        switch (this.method) {
            case 'POST':
                return this.create(request);
            case 'GET':
                return this.read(request);
            case 'PUT':
                return this.update(request);
            case 'DELETE':
                return this.delete(request);
            default: return notFound();
        }
    }

    abstract create: (request: HttpRequest) => Promise<HttpResponse>;

    abstract read: (request: HttpRequest) => Promise<HttpResponse>;

    abstract update: (request: HttpRequest) => Promise<HttpResponse>;

    abstract delete: (request: HttpRequest) => Promise<HttpResponse>;

}
