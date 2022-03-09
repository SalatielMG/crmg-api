import { IClientRepository } from '@/domain/models/gateways/client.repository';
import { IContractRepository } from '@/domain/models/gateways/contract.repository';

interface GenericResult {
    message: string
}

export interface ResultClient extends GenericResult {
    client: IClientRepository
}

export interface ResultContract extends GenericResult {
    contract: IContractRepository
};