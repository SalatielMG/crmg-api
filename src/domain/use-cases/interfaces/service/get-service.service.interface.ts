import { IServiceRepository } from '@/domain/models/gateways/service.repository';

export interface IGetServiceServiceInterface {
    getServicesContract: () => Promise<IGetServiceServiceInterface.Results>;
}

export namespace IGetServiceServiceInterface {
    export type Results = {
        services: IServiceRepository[]
    }
}