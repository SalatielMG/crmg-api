import {ISendInvitationService} from "@/domain/use-cases/send-invitation-service";
import {ISendMail} from "@/domain/use-cases/helpers/send-email";
import {randomNumbers} from "@/infrastructure/helpers/util";
import {TYPES} from "@/infrastructure/helpers/constant";
import moment = require("moment-timezone");
import {SITE_TIME_ZONE} from "@/application/config/environment";
import mail_templates from 'email-templates';
import {Op} from 'sequelize';
import {InvitationModel} from '@/domain/models/invitation.model';

export class SendInvitationServiceImpl implements ISendInvitationService {
    constructor(
        private readonly sendEmailRepository: ISendMail,
        private emailT: mail_templates
    ) {}
    async sendInvitationConfirmEmailService(
        email: string,
        from?: string,
        subject?: string,
        body?: string,): Promise<boolean> {
        try {

            let findOldInvitationVerificationEmailActive = await InvitationModel.findOne({
                where: {
                    email,
                    type: TYPES.INVITATION.VERIFICATION_EMAIL,
                    expiredDate: {
                        [Op.gt]: moment.tz(new Date(), SITE_TIME_ZONE).toDate()
                    }
                }
            });
            if (findOldInvitationVerificationEmailActive) {
                findOldInvitationVerificationEmailActive.get({ plain: true });
                console.log('findOldInvitationVerificationEmailActive', findOldInvitationVerificationEmailActive);
                return null;
            }

            const token = randomNumbers(6);
            let emailTemplate = await this.emailT.render('verify_token.pug', {token});
            const data = {
                to: email,
                from,
                subject,
                body,
                token,
                emailTemplate
            };
            console.log('data', data);
            let response = await this.sendEmailRepository.sendEmail(data);
            console.log('response', response);
            // VErifcar si exxiten invitaciones de virifacion anteriores con ese correo
            // ? eliminarlas
            // Crear esta nueva invitacion.

            let deleteOldInvitationVerificationEmail = await InvitationModel.destroy({
                where: {
                    email,
                    type: TYPES.INVITATION.VERIFICATION_EMAIL
                }
            });
            console.log('deleteOldInvitationVerificationEmail', deleteOldInvitationVerificationEmail);
            let createInvitation = await InvitationModel.create({
                email,
                type: TYPES.INVITATION.VERIFICATION_EMAIL,
                token,
                expiredDate: moment.tz(new Date(), SITE_TIME_ZONE).add(5, 'minutes').toDate()
            });
            return true;
            // console.log('createInvitation', createInvitation);
        } catch (e) {
            console.log('error sendInvitationConfirmEmailService', e);
            return null;
        }
    }

}
