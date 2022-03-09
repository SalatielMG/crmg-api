import { IContractCreationRepository } from '@/domain/models/gateways/contract.repository';
import { makeCreateContractFactory } from '@/infrastructure/driven-adapters/factories/contract/create-contract.factory';
import { makeDestroyContractFactory } from '@/infrastructure/driven-adapters/factories/contract/destroy-contract.factory';
import { makeGetContract } from '@/infrastructure/driven-adapters/factories/contract/get-contract.factory';
import { makeUpdateContractFactory } from '@/infrastructure/driven-adapters/factories/contract/update-contract.factory';
import { badRequest, HttpRequest, HttpResponse, notFound, ok } from "@/infrastructure/helpers/http";
import { ActionResourceController } from "../../gateways/controller/action-resource-controller";

export type ActionContract =
'UPDATE_STATUS' |
'VALIDATE_CONTRACT_CLIENT_BELONGS_TO_COMPANY'
;

export class ContractController extends ActionResourceController<ActionContract> {

    // Action Controller
    
    handleAction = async (request: HttpRequest): Promise<HttpResponse> => {
        console.log('handleAction this.action', this.action);
        switch (this.action) {
            case 'UPDATE_STATUS':
                return this.updateStatusContract(request);
            default:
                return notFound();
        }
    };

    private updateStatusContract = async ({ personnel: { companyId }, params: { contractId }, body, client: { id } }: HttpRequest):Promise<HttpResponse> => {
        const responseUpdateContract = await makeUpdateContractFactory().updateStatusContract(body, companyId, id, contractId);
        return ok(responseUpdateContract);
    }

    // Resource Controller

    create = async ({ personnel, body: {contract}, client: { id } }: HttpRequest): Promise<HttpResponse> => {
        const contractData: IContractCreationRepository = {
            ...contract,
            companyId: personnel.companyId,
            clientId: id,
            status: 'Activated',
        };
        const responseCreateContract = await makeCreateContractFactory()
        .createContract(contractData);
        return ok({
            ...responseCreateContract
        });
    }

    read = async ({ personnel: { companyId }, params: { contractId }, client: { id } }: HttpRequest): Promise<HttpResponse> => {
        if (contractId) {
            return this.getContract(companyId, contractId, id);
        }
        return this.getContracts(companyId, id);
    }
    
    update = async ({ personnel: { companyId }, params: { contractId }, body: { contract: { name, dateStart, observation, serviceId } }, client: { id }}: HttpRequest): Promise<HttpResponse> => {
        console.log('id client to update contract', id);
        const responseUpdateContract = await makeUpdateContractFactory().updateContract({
            name,
            dateStart,
            observation,
            serviceId
        }, companyId, id, contractId);
        return ok(responseUpdateContract);
    }
    
    delete = async ({ params: { contractId } }: HttpRequest): Promise<HttpResponse> => {
        console.log('delete controllet method', contractId);
        const responseDestroyContract = await makeDestroyContractFactory().destroyContract(contractId);
        return ok(responseDestroyContract);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private getContract = async (companyId: number, contractId: number, clientId: number): Promise<HttpResponse> => {
        const responseGetContract = await makeGetContract().getContract(companyId, clientId, contractId);
        if (!responseGetContract) {
            return badRequest('El contrato no existe');
        }
        return ok(responseGetContract);
    }

    private getContracts = async (companyId: number, clientId: number): Promise<HttpResponse> => {
        const responseGetContract = await makeGetContract().getContracts(companyId, clientId);
        return ok(responseGetContract);
    }

}