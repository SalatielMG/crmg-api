import { IServiceCreationRepository, IServiceRepository } from '@/domain/models/gateways/service.repository';
import { ServiceModel } from '@/domain/models/service.model';
import { BaseRepositoryAdapter } from './base.repository.adapter';

export class ServiceRepositoryAdapter extends BaseRepositoryAdapter<IServiceRepository, IServiceCreationRepository, ServiceModel> {
    constructor() {
        super(ServiceModel);
    }
}