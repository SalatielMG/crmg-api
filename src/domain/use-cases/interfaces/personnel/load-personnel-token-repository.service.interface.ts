import {IPersonnelRepository} from '@/domain/models/gateways/personnel.repository';

export interface ILoadPersonnelTokenRepositoryService {
    loadPersonnelByToken (accessToken: string): Promise<ILoadPersonnelTokenRepositoryService.Result>;
}

export namespace ILoadPersonnelTokenRepositoryService {
    export type Result = {
        personnel: IPersonnelRepository
    }
}
