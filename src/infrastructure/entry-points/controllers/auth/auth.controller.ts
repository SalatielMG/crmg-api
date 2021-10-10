import {ActionController} from '@/infrastructure/entry-points/gateways/action-controller';
import {badRequest, HttpRequest, HttpResponse, notFound, ok, unauthorized} from '@/infrastructure/helpers/http';
import {makeAuthenticationFactory} from '@/infrastructure/driven-adapters/factories/authentication/authentication.factory';
import {AuthenticationService} from '@/domain/use-cases/impl/authentication/authentication.service';
import {ENABLED_MANUAL_SET_PASSWORD} from '@/application/config/environment';
import {makeManualUpdatePasswordFactory} from '@/infrastructure/driven-adapters/factories/authentication/manual-update-password.factory';
import {IManualUpdatePasswordService} from '@/domain/use-cases/interfaces/authentication/manual-update-password.service.interface';
import {makeRefreshAccessTokenFactory} from '@/infrastructure/driven-adapters/factories/authentication/refresh-access-token.factory';
import {RefreshAccessTokenService} from '@/domain/use-cases/impl/authentication/refresh-access-token.service';

export type Action = 'LOGIN'
    | 'MANUAL_UPDATE_PASSWORD'
    | 'REFRESH_ACCESS_TOKEN'
    ;

export class AuthController extends ActionController<Action> {

    constructor(action?: Action) {
        super(action);
    }

    handle = async (request: HttpRequest): Promise<HttpResponse> => {
        switch (this.action) {
            case 'LOGIN':
                return this.login(request, makeAuthenticationFactory());
            case 'MANUAL_UPDATE_PASSWORD':
                return this.manualUpdatePassword(request, makeManualUpdatePasswordFactory());
            case 'REFRESH_ACCESS_TOKEN':
                return this.refreshAccessToken(request, makeRefreshAccessTokenFactory());
            default: return notFound();
        }
    };

    private login = async (request: HttpRequest, authenticationService: AuthenticationService): Promise<HttpResponse> => {
        const {email, password} = request.body;
        const responseAuthentication = await authenticationService.auth({ email, password })
        if (!responseAuthentication) {
            return unauthorized()
        }
        console.log('request.body', request.body);
        return ok(responseAuthentication);
    }

    private manualUpdatePassword = async (request: HttpRequest, manualUpdatePasswordService :IManualUpdatePasswordService): Promise<HttpResponse> => {
        const {password, userId} = request.body;
        console.log('request.body;', request.body, ENABLED_MANUAL_SET_PASSWORD);
        if (!ENABLED_MANUAL_SET_PASSWORD) {
            return badRequest('La opcion de actualizar la contraseña manualmente, no esta habilitada');
        }
        const responseUpdatePassword = await manualUpdatePasswordService.updatePassword(password, userId)
        console.log('responseUpdatePassword', responseUpdatePassword);
        return ok({
           message: 'Contraseña actualizada!'
        });
    }

    private refreshAccessToken = async (request: HttpRequest, refreshAccessTokenService: RefreshAccessTokenService): Promise<HttpResponse> => {
        const {accessToken} = request.body;
        const responseRefreshAccessToken = await refreshAccessTokenService.refreshAccessToken({accessToken});
        if (!responseRefreshAccessToken) {
            return unauthorized('Session expirada');
        }
        return ok(responseRefreshAccessToken);
    }
}
