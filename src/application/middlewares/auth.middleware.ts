import {HttpRequest, HttpResponse, ok, unauthorized} from '@/infrastructure/helpers/http';
import {adaptRoute} from '@/application/config/express-router-adapter';
import {makeLoadPErsonnelByAccessTokenFactory} from '@/infrastructure/driven-adapters/factories/personnel/load-personnel-by-token.factory';
import {LoadPersonnelTokenRepositoryService} from '@/domain/use-cases/impl/personnel/load-personnel-token-repository.service';
import {authMiddlewareAdapter} from '@/application/config/middleware-adapter';
import {ActionMiddleware} from '@/infrastructure/entry-points/gateways/middleware/action-middleware';

export type Action =
'AUTH';

export class AuthMiddleware extends ActionMiddleware<Action> {

    constructor(action: Action) {
        super(action);
    }

    handle = async (request: HttpRequest): Promise<HttpResponse> => {
        switch (this.action) {
            case 'AUTH': return this.auth(request, makeLoadPErsonnelByAccessTokenFactory());
        }
    };

    private auth = async (request: HttpRequest, loadPersonnelTokenRepositoryService: LoadPersonnelTokenRepositoryService): Promise<HttpResponse> => {
        let accessToken: string = request.headers.authorization.split(' ')[1];
        const responseLoadPersonnel = await loadPersonnelTokenRepositoryService.loadPersonnelByToken(accessToken);
        if (!responseLoadPersonnel) {
            return unauthorized('Unauthorized')
        }
        return ok(responseLoadPersonnel);
    }

}

export const auth = authMiddlewareAdapter(new AuthMiddleware('AUTH'));
