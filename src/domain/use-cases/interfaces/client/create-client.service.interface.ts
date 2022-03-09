import {IClientCreationRepository, IClientRepository} from '@/domain/models/gateways/client.repository';
import { ResultClient } from '..';

export interface ICreateClientServiceInterface {
    createClient: (dataClient: IClientCreationRepository) => Promise<ICreateClientServiceInterface.Result>;
}

export namespace ICreateClientServiceInterface {
    export interface Result extends ResultClient {}
}
