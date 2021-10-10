import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {
    badRequest,
    HttpRequest,
    HttpResponse,
    noContent,
    serverError,
    unprocessableEntity
} from "@/infrastructure/helpers/http";
import {fieldsValidation} from "@/infrastructure/helpers/fields-validation";
import {ISendInvitationService} from "@/domain/use-cases/send-invitation-service";
import {SendInvitationServiceImpl} from "@/domain/use-cases/impl/send-invitation-service-impl";
import {CONFIG_NODEMAILER, MAIL_FROM, MAIL_SUBJECT} from "@/application/config/environment";
import {NodemailerAdapter} from "@/infrastructure/driven-adapters/helpers/nodemailer-adapter";

export class SendInvitationController  implements IController {

    constructor(
        private sendInvitationService: ISendInvitationService
    ) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const body = request.body;
            const { errors, isValid } = fieldsValidation(body);
            console.log('errors', errors);
            console.log('isValid', isValid);
            if (!isValid) return unprocessableEntity(errors);
            const { email } = body;
            const sendInvitationResponse = await this.sendInvitationService.sendInvitationConfirmEmailService(
                email,
                MAIL_FROM,
                'Verifica tu cuenta - CRMG');
            console.log('sendInvitationResponse', sendInvitationResponse);
            if (!sendInvitationResponse) return badRequest('Error al enviar el correo para confirmacion de su cuenta');
            // if (!sendInvitationResponse) return badRequest('El email no se encuentra registrado');
            return noContent();
        } catch (error) {
            return serverError(error);
        }
    }
}
