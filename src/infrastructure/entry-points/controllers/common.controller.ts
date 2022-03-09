import {HttpRequest, HttpResponse, ok} from '@/infrastructure/helpers/http';
import {ResourceController} from '@/infrastructure/entry-points/gateways/controller/resource-controller';

export class CommonController extends ResourceController {
    create: (request: HttpRequest) => Promise<HttpResponse>;
    delete: (request: HttpRequest) => Promise<HttpResponse>;
    read = async (request: HttpRequest): Promise<HttpResponse> => {
        console.log('read common Controller');
        return ok(request.personnel);
    };
    update: (request: HttpRequest) => Promise<HttpResponse>;

}
