import {ISendInvitationService} from "@/domain/use-cases/send-invitation-service";
import {SendInvitationServiceImpl} from "@/domain/use-cases/impl/send-invitation-service-impl";
import {NodemailerAdapter} from "@/infrastructure/driven-adapters/helpers/nodemailer-adapter";
import {MAIL_HOST, MAIL_PASSWORD, MAIL_PORT, MAIL_USERNAME} from "@/application/config/environment";
import mail_templates from 'email-templates';

export const makeDbSendInvitation = ():ISendInvitationService => {
    const config = {
        host: MAIL_HOST,
        port: MAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: MAIL_USERNAME,
            pass: MAIL_PASSWORD,
        },
    };
    const nodemailerRepositoyAdapter = new NodemailerAdapter(config);
    return new SendInvitationServiceImpl(
        nodemailerRepositoyAdapter,
        new mail_templates()
    );
}
