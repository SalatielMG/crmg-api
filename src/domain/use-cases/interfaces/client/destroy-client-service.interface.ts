import { ResultClient } from '..';

export interface IDestroyClientServiceInterface {
    destroyClient: (clientId: number) => Promise<IDestroyClientServiceInterface.Result>;
}

export namespace IDestroyClientServiceInterface {
    export interface Result extends ResultClient {}
}
