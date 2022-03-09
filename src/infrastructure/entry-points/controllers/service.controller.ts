import { makeGetServiceFactory } from '@/infrastructure/driven-adapters/factories/service/get-service.factory';
import { HttpRequest, HttpResponse, notFound, ok } from '@/infrastructure/helpers/http';
import { ActionResourceController } from '../gateways/controller/action-resource-controller';

export type ActionService = 
'GET_SERVICES_CONTRACT'
;

export class ServiceController extends ActionResourceController<ActionService> {

    // Action Controller

    handleAction = async (request: HttpRequest): Promise<HttpResponse> => {
        console.log('handleAction', this.action);
        switch (this.action) {
            case 'GET_SERVICES_CONTRACT':
                return this.getServicesController();
            default:
                return notFound();
        }
    }

    private getServicesController = async (): Promise<HttpResponse> => {
        const responseGetServices = await makeGetServiceFactory().getServicesContract();
        return ok(responseGetServices);
    }

    // Resource Controller

    create: (request: HttpRequest) => Promise<HttpResponse>;
    read: (request: HttpRequest) => Promise<HttpResponse>;
    update: (request: HttpRequest) => Promise<HttpResponse>;
    delete: (request: HttpRequest) => Promise<HttpResponse>;
}