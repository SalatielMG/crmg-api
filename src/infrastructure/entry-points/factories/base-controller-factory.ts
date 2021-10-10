import {IController} from '@/infrastructure/entry-points/gateways/controller';
import {ACTION_CONTROLLER} from '@/infrastructure/helpers/constant';
import {SendInvitationController} from "@/infrastructure/entry-points/controllers/auth/send-invitation-controller";
import {makeDbSendInvitation} from "@/infrastructure/driven-adapters/factories/authentication/send-invitation.factory";
import {ConfirmEmailTokenController} from "@/infrastructure/entry-points/controllers/auth/confirm-email-token-controller";

export const baseControllerFactory = (actionController: string): IController => {
    switch (actionController) {
        case ACTION_CONTROLLER.SEND_INVITATION:
            return new SendInvitationController(makeDbSendInvitation());
        case ACTION_CONTROLLER.CONFIRM_EMAIL_TOKEN:
            return new ConfirmEmailTokenController();
        // default:break;
    }
}
