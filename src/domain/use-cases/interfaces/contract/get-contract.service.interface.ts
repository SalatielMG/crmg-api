import { IContractRepository } from "@/domain/models/gateways/contract.repository";

export interface IGetContractServiceInterface {
    getContracts: (companyId: number, clientId: number) => Promise<IGetContractServiceInterface.Results>;
    getContract: (companyId: number, clientId: number, contractId: number) => Promise<IGetContractServiceInterface.Result>;
}

export namespace IGetContractServiceInterface {
    export type Results = {
        contracts: IContractRepository[]
    }

    export type Result = {
        contract: IContractRepository
    }
}