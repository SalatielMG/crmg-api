import { ResultContract } from '..';

export interface IDestroyContractServiceInterface {
    destroyContract: (contractId: number) => Promise<IDestroyContractServiceInterface.Result>
}

export namespace IDestroyContractServiceInterface {
    export interface Result extends ResultContract {}
}