import {IManualUpdatePasswordService} from '@/domain/use-cases/interfaces/authentication/manual-update-password.service.interface';
import {ManualUpdatePasswordService} from '@/domain/use-cases/impl/authentication/manual-update-password.service';
import {BcryptAdapter} from '@/infrastructure/driven-adapters/helpers/bcrypt-adapter';
import {SALT} from '@/application/config/environment';
import {PersonnelRepositoryAdapter} from '@/infrastructure/driven-adapters/adapters/personnel.repository.adapter';

export const makeManualUpdatePasswordFactory = (): IManualUpdatePasswordService => {
    return new ManualUpdatePasswordService(
        new BcryptAdapter(SALT),
        new PersonnelRepositoryAdapter()
    )
}
