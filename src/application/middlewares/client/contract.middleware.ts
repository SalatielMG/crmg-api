import { IContractRepository, StatusTypeContract } from '@/domain/models/gateways/contract.repository';
import { ContractRepositoryAdapter } from '@/infrastructure/driven-adapters/adapters/contract.repository.adapter';
import { ServiceRepositoryAdapter } from '@/infrastructure/driven-adapters/adapters/service.repository.adapter';
import { ActionContract } from '@/infrastructure/entry-points/controllers/client/contract.controller';
import { ActionResourceController } from '@/infrastructure/entry-points/gateways/controller/action-resource-controller';
import { badRequest, HttpRequest, HttpResponse, notFound, ok } from '@/infrastructure/helpers/http';
import { translate } from '@/infrastructure/helpers/translate';
import { dateTz } from '@/infrastructure/helpers/util';

export class ContractMiddleware extends ActionResourceController<ActionContract> {
    
    constructor (action?: ActionContract) {
        super(action)
    }

    // Middleware Action Middleware

    handleAction = async (request: HttpRequest): Promise<HttpResponse> => {
        switch(this.action) {
            case 'UPDATE_STATUS':
                return this.validateUpdateStatus(request);
            case 'VALIDATE_CONTRACT_CLIENT_BELONGS_TO_COMPANY':
                return this.validateContractClientBelongsToCompany(request);
            default:
                return notFound();
        }
    }

    private validateContractClientBelongsToCompany = async({ personnel: {companyId}, params, client: { id }}: HttpRequest, contractRepositoryAdapter: ContractRepositoryAdapter = new ContractRepositoryAdapter()): Promise<HttpResponse> => {
        let { contractId } = params;
        contractId = Number(contractId);
        const contract = await contractRepositoryAdapter.findOneRepository({
            companyId,
            clientId: id,
            id: contractId
        }, {
            raw: true,
            nest: true
        });
        if (!contract) {
            return badRequest('El contrato no existe');
        }
        return ok({
            contract,
            params: {
                ...params,
                contractId
            }
        });
    }

    private validateUpdateStatus = async ({ body: { status }, contract }: HttpRequest):Promise<HttpResponse> => {
        let statusValid: StatusTypeContract[] = [];
        let attributeObject: Partial<IContractRepository> = {};
        let today = dateTz(new Date())
        
        switch (status as StatusTypeContract) {
            case 'Paused':
                statusValid = [
                    'Activated'
                ];
                attributeObject['pausedAt'] = today;
                break;
            case 'Activated':
                statusValid = [
                    'Paused'
                ];
                attributeObject['activatedAt'] = today
                break;
            case 'Canceled':
                statusValid = [
                    'Activated',
                    'Paused'
                ];
                attributeObject['canceledAt'] = today;
                attributeObject['dateEnd'] = today;
                break;
            default:
                return badRequest('No se puede actualizar al status solicitado');
        }
        const translateStatus = translate('CONTRACT_STATUS')[status];
        if (!statusValid.includes(contract.status)) {
            return badRequest(`El contrato ${contract.name} no puede ser ${translateStatus.literal} porque actualmente esta ${translateStatus.toBe}`);
        }
        return ok({
            body: {
                status,
                ...attributeObject
            }
        });
    }

    // Middleware Resource Middleware

    create = async ({ personnel: {companyId}, body: { contract: { serviceId }} }: HttpRequest): Promise<HttpResponse> => {

        const service = await this.validateService(companyId, serviceId);

        if (!service) {
            return badRequest('No se puede crear el contrato, porque el servicio seleccionado no existe');
        }

        return ok();
    }
    
    read: (request: HttpRequest) => Promise<HttpResponse>;
    
    update = async ({ personnel: {companyId}, body: { contract: { serviceId }}, client }: HttpRequest): Promise<HttpResponse> => {
        console.log('middleware update client', client);
        const service = await this.validateService(companyId, serviceId);

        if (!service) {
            return badRequest('No se puede actualizar el contrato, porque el servicio seleccionado no existe');
        }

        return ok();
    }
    
    delete = async ({ contract: { status, name } }: HttpRequest): Promise<HttpResponse> => {
        // Pending validate to delete contract
        if (status !== 'Canceled') {
            return badRequest(`No se puede eliminar el contrato: ${name}, hasta que primero lo hayas cancelado`);
        }
        return ok();
    }

    private validateService = async (companyId: number, serviceId: number, serviceRepositoryAdapter: ServiceRepositoryAdapter = new ServiceRepositoryAdapter()) => {
        return serviceRepositoryAdapter.findOneRepository({
            companyId,
            id: serviceId
        }, {
            raw: true,
            nest: true
        });
    }

}