import {IManualUpdatePasswordService} from '@/domain/use-cases/interfaces/authentication/manual-update-password.service.interface';
import {BcryptAdapter} from '@/infrastructure/driven-adapters/helpers/bcrypt-adapter';
import {PersonnelRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/personnel.repository.adapter';

export class ManualUpdatePasswordService implements IManualUpdatePasswordService {
    constructor(
        private readonly bcryptAdapter: BcryptAdapter,
        private readonly personnelRepositoryAdapter: PersonnelRepositoryAdapter
    ) {
    }
    updatePassword = async (newPassword: string, personnelId: number): Promise<void> => {
        const hasPassword = await this.bcryptAdapter.hash(newPassword);
        console.log('hasPassword', hasPassword);
        await this.personnelRepositoryAdapter.updateByIdRepository(personnelId, {
            password: hasPassword
        });
    }
}
