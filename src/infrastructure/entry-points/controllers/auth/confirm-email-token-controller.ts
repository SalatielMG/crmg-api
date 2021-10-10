import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {badRequest, HttpRequest, HttpResponse, ok, serverError} from "@/infrastructure/helpers/http";
import moment = require("moment-timezone");
import {SITE_TIME_ZONE} from "@/application/config/environment";
import {Op} from "sequelize";
import {TYPES} from "@/infrastructure/helpers/constant";
import {InvitationModel} from '@/domain/models/invitation.model';

export class ConfirmEmailTokenController  implements IController {

    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            let { email, token } = request.body;
            let today = moment.tz(new Date(), SITE_TIME_ZONE).toDate();
            let resultVerify= await InvitationModel.update({
                verifiedAt: today
            }, {
                where: {
                    email,
                    type: TYPES.INVITATION.VERIFICATION_EMAIL,
                    token,
                    expiredDate: {
                        [Op.gt]: today
                    }
                }
            });
            console.log('resultVerify', resultVerify);
            if (!resultVerify[0]) return badRequest('El token es incorrecto o ha expirado');
            return ok({
                message: 'Su correo ha sido verificado correctamente'
            });
        } catch (error) {
            return serverError(error);
        }
    }
}
