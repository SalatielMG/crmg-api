import {IGetClientServiceInterface} from '../../interfaces/client/get-clients.service.interface';
import {ClientRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/client.repository.adapter';

export class GetClientService implements IGetClientServiceInterface {

    constructor(
        private readonly clientRepositoryAdapter: ClientRepositoryAdapter
    ) {}

    getClients = async (companyId: number): Promise<IGetClientServiceInterface.Results> => {
        const clients = await this.clientRepositoryAdapter.findAllRepository({
            where: {
                companyId
            }
        });
        return {
            clients
        };
    };

    getClient = async (companyId: number, clientId: number): Promise<IGetClientServiceInterface.Result> => {
        const client = await this.clientRepositoryAdapter.findOneRepository({
            id : clientId,
            companyId
        });
        if (client) {
            return {
                client
            }
        }
        return null;
    };

}
