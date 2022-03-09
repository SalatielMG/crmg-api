import {ActionResourceMiddleware} from '@/infrastructure/entry-points/gateways/middleware/action-resource-middleware';
import {badRequest, HttpRequest, HttpResponse, notFound, ok} from '@/infrastructure/helpers/http';
import {ClientRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/client.repository.adapter';
import {IClientRepository} from '@/domain/models/gateways/client.repository';
import { Op } from 'sequelize';

export type Action = 'VALIDATE_CLIENT_BELONGS_TO_COMPANY';

export class ClientMiddleware extends ActionResourceMiddleware<Action> {

    constructor (action?: Action) {
        super(action)
    }

    // Middleware Action Middleware

    handleAction = async (request: HttpRequest): Promise<HttpResponse> => {
        switch (this.action) {
            case 'VALIDATE_CLIENT_BELONGS_TO_COMPANY':
                return this.validateClientBelongsToCompany(request);
            default: 
                return notFound();
        }
    };

    validateClientBelongsToCompany = async({ personnel, params }: HttpRequest, clientRepositoryAdapter: ClientRepositoryAdapter = new ClientRepositoryAdapter()):Promise<HttpResponse> => {
        console.log('params validateClientBelongsToCompany', params);
        const clientId = Number(params.clientId);
        const client = await this.getClientByCompany(clientRepositoryAdapter, clientId, personnel.companyId);
        if (!client) {
            return badRequest('El cliente no existe');
        }
        return ok({
            client,
            params: {
                ...params,
                clientId
            }
        });
    }

    // Middleware Resource Middleware

    create = async (request: HttpRequest, clientRepositoryAdapter: ClientRepositoryAdapter = new ClientRepositoryAdapter()): Promise<HttpResponse> => {
        const { personnel } = request;
        const client = request.body as IClientRepository;
        // Validate unique email
        const isUniqueEmail = await clientRepositoryAdapter.isUniqueEmailClientByCompany(client.email, personnel.companyId);
        if (!isUniqueEmail) {
            return badRequest('El email ya se encuentra en uso');
        }
        const isUniquePhoneNumber = await clientRepositoryAdapter.isUniquePhoneNumberByCompany(client.phoneNumber.toString(), personnel.companyId);
        if (!isUniquePhoneNumber) {
            return badRequest('El numero telefonico ya se encuentra en uso');
        }
        // Validate unique phoneNumber
        return ok({});
    };

    delete = async ({ params: { clientId } }: HttpRequest, clientRepositoryAdapter: ClientRepositoryAdapter = new ClientRepositoryAdapter()): Promise<HttpResponse> => {
        // Validar que el cliente se pueda eliminar
        // # Pending

        if (!clientRepositoryAdapter.isValidateDestroyClient(clientId)) {
            return badRequest('El cliente no puede ser eliminada');
        }

        return ok();
    };

    read: (request: HttpRequest) => Promise<HttpResponse>;

    update = async (request: HttpRequest, clientRepositoryAdapter: ClientRepositoryAdapter = new ClientRepositoryAdapter()): Promise<HttpResponse> => {
        const clientId = request.params.clientId
        const { email, phoneNumber }  = request.body as Partial<IClientRepository>;
        const { personnel } = request;
        
        if (email) {
            const isUniqueEmail = await clientRepositoryAdapter.isUniqueClientByCompany({
                id: {
                    [Op.ne]: clientId
                },
                email: email.toLowerCase(),
                companyId: personnel.companyId
            });
    
            if (!isUniqueEmail) {
                return badRequest('El email ya se encuentra en uso');
            }
        }        

        const isUniquePhoneNumber = await clientRepositoryAdapter.isUniqueClientByCompany({
            id: {
                [Op.ne]: clientId
            },
            phoneNumber: phoneNumber,
            companyId: personnel.companyId
        });

        if (!isUniquePhoneNumber) {
            return badRequest('El número telefónico ya se encuentra en uso');
        }

        return ok();
    };

    // Private Functions

    private getClientByCompany = async (clientRepositoryAdapter: ClientRepositoryAdapter, clientId: number, companyId: number) => {
        return clientRepositoryAdapter.findOneRepository({
            id: clientId,
            companyId
        }, {
            raw: true,
            nest: true
        });
    }

}
