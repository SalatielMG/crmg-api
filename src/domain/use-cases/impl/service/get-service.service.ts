import { ServiceRepositoryAdapter } from '@/infrastructure/driven-adapters/adapters/service.repository.adapter';
import { CATEGORY_ID_SERVICES_CONTRACT } from '@/infrastructure/helpers/constant';
import { IGetServiceServiceInterface } from '../../interfaces/service/get-service.service.interface';

export class GetService implements IGetServiceServiceInterface {

    constructor (
        private readonly serviceRepositoryAdapter: ServiceRepositoryAdapter
    ) {}

    getServicesContract = async (): Promise<IGetServiceServiceInterface.Results> => {
        const services = await this.serviceRepositoryAdapter.findAllRepository({
            where: {
                categoryId: CATEGORY_ID_SERVICES_CONTRACT
            }
        });
        return {
            services
        };
    }

}