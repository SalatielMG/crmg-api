import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {HttpRequest, HttpResponse, ok, serverError} from "@/infrastructure/helpers/http";

export class SetPasswordController  implements IController {
    
    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            // let { email, }
            /*
            * Confim
            * */
            return ok('');
        } catch (error) {
            return serverError(error);
        }
        return
    }
}
