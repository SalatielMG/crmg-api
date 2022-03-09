import {IClientRepository} from '@/domain/models/gateways/client.repository';

export interface IGetClientServiceInterface {
    getClients: (companyId: number) => Promise<IGetClientServiceInterface.Results>;
    getClient: (companyId: number, clientId: number) => Promise<IGetClientServiceInterface.Result>;
}

export namespace IGetClientServiceInterface {
    export type Results = {
        clients: IClientRepository[]
    }

    export type Result = {
        client: IClientRepository
    }
}
