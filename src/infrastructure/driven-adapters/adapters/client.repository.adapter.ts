import {BaseRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/base.repository.adapter';
import {IClientCreationRepository, IClientRepository} from '@/domain/models/gateways/client.repository';
import {ClientModel} from '@/domain/models/client.model';
import { WhereOptions } from 'sequelize/types';

export class ClientRepositoryAdapter extends BaseRepositoryAdapter<IClientRepository, IClientCreationRepository, ClientModel> {
    constructor()
    {
        super(ClientModel)
    }

    isUniqueEmailClientByCompany = async (email: string, companyId: number): Promise<boolean> => {
        return ! await this.findOneRepository({
            email: email.toLowerCase(),
            companyId
        });
    }

    isUniquePhoneNumberByCompany = async (phoneNumber: string, companyId: number): Promise<boolean> => {
        return ! await this.findOneRepository({
            phoneNumber,
            companyId
        });
    }

    isUniqueClientByCompany = async (where: (Partial<IClientRepository> | WhereOptions)): Promise<boolean> => {
        return ! await this.findOneRepository(where);
    }

    isValidateDestroyClient = async (clientId: number): Promise<boolean> => {
        // Pending validation
        return true;
    }
}
