import {IPersonnelRepository} from '@/domain/models/gateways/personnel.repository';

export interface IGetPersonnelService {
    getPersonnel: (personnelId: number) => Promise<IGetPersonnelService.Result>;
}

export namespace IGetPersonnelService {
    export type Result = {
        user: IPersonnelRepository
    }
}
