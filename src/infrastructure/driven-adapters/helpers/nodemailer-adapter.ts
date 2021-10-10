import nodemailer from 'nodemailer'
import {ISendMail} from "@/domain/use-cases/helpers/send-email";

export class NodemailerAdapter implements ISendMail {

    constructor(
        private readonly configuration: Object
    ) {
    }

    async sendEmail(message: ISendMail.ParamsMail): Promise<void> {
        const transporter = nodemailer.createTransport(this.configuration);

        await transporter.sendMail({
            from: message.from,
            to: message.to,
            subject: message.subject,
            html: message.emailTemplate
        })
    }
}
