import {IClientRepository} from '@/domain/models/gateways/client.repository';
import { ResultClient } from '..';

export interface IUpdateClientServiceInterface {
    updateClient: (dataClient: Partial<IClientRepository>, clientId: number) => Promise<IUpdateClientServiceInterface.Result>;
}

export namespace IUpdateClientServiceInterface {
    export interface Result extends ResultClient {}
}
