import {badRequest, HttpRequest, HttpResponse, ok} from '@/infrastructure/helpers/http';
import {IClientRepository} from '@/domain/models/gateways/client.repository';
import {makeGetClient} from '@/infrastructure/driven-adapters/factories/client/get-client.factory';
import {makeCreateClientFactory} from '@/infrastructure/driven-adapters/factories/client/create-client.factory';
import {ResourceController} from '@/infrastructure/entry-points/gateways/controller/resource-controller';
import {makeUpdateClientFactory} from '@/infrastructure/driven-adapters/factories/client/update-client.factory';
import {makeDestroyClientFactory} from '@/infrastructure/driven-adapters/factories/client/destroy-client.factory';

export class ClientController extends ResourceController {

    // -----------------------------------------------------------------------------------------------------
    // @ Public Http methods
    // -----------------------------------------------------------------------------------------------------

    create = async (request: HttpRequest): Promise<HttpResponse> => {
        const {personnel} = request;
        const clientData = request.body as IClientRepository;
        const responseCreateClient = await makeCreateClientFactory().createClient({
            ...clientData,
            companyId: personnel.companyId
        });
        return ok(responseCreateClient);
    };

    delete = async (request: HttpRequest): Promise<HttpResponse> => {
        const clientId = Number(request.params.clientId);
        const responseDestroyClient = await makeDestroyClientFactory().destroyClient(clientId);
        return ok(responseDestroyClient);
    };

    read = async (request: HttpRequest): Promise<HttpResponse> => {
        console.log('request.params read get Client', request.params);
        const clientId = Number(request.params.clientId);
        const {personnel: {companyId}} = request;
        if (clientId) {
            return this.getClient(companyId, clientId);
        }
        return this.getClients(companyId);
    };

    update = async (request: HttpRequest): Promise<HttpResponse> => {
        const clientId = Number(request.params.clientId);
        const dataClient = request.body as Partial<IClientRepository>;
        const responseUpdateClient = await makeUpdateClientFactory().updateClient(dataClient, clientId);
        return ok(responseUpdateClient);
    };

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private getClient = async (companyId: number, clientId: number): Promise<HttpResponse> => {
        const responseGetClient = await makeGetClient().getClient(companyId, clientId);
        if (!responseGetClient) {
            return badRequest('El cliente no existe');
        }
        return ok(responseGetClient);
    }

    private getClients = async (companyId: number): Promise<HttpResponse> => {
        const responseGetClient = await makeGetClient().getClients(companyId);
        if (!responseGetClient) {
            return badRequest('El cliente no existe');
        }
        return ok(responseGetClient);
    }

}
