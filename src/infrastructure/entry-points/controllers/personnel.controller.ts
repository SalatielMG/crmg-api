import {badRequest, HttpRequest, HttpResponse, ok} from '@/infrastructure/helpers/http';
import {AuthenticationService} from '@/domain/use-cases/impl/authentication/authentication.service';
import {makeAuthenticationFactory} from '@/infrastructure/driven-adapters/factories/authentication/authentication.factory';
import {IAuthenticationService} from '@/domain/use-cases/interfaces/authentication/authentication.service.interface';
import {makeGetPersonnelFactory} from '@/infrastructure/driven-adapters/factories/personnel/get-personnel.factory';
import {ResourceController} from '@/infrastructure/entry-points/gateways/controller/resource-controller';

export class PersonnelController extends ResourceController {

    // -----------------------------------------------------------------------------------------------------
    // @ Public Http methods
    // -----------------------------------------------------------------------------------------------------

    create: (request: HttpRequest) => Promise<HttpResponse>;
    delete: (request: HttpRequest) => Promise<HttpResponse>;
    read = async (request: HttpRequest): Promise<HttpResponse> => {
        const personnelId = Number(request.params.id);
        if (personnelId) {
            return this.getPersonnel(personnelId);
        }
        return this.getPersonnels();
    }
    update: (request: HttpRequest) => Promise<HttpResponse>;

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private getPersonnel = async (personnelId: number): Promise<HttpResponse> => {
        const responseGetPersonnel = await makeGetPersonnelFactory().getPersonnel(personnelId);
        if (!responseGetPersonnel) {
            return badRequest('Usuario no encontrado');
        }
        return ok(responseGetPersonnel);
    }

    private getPersonnels = async (): Promise<HttpResponse> => {
        return ok({
            users: []
        })
    }

}
