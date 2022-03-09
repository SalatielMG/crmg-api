import {IController} from '@/infrastructure/entry-points/gateways/controller';
import {HttpRequest, HttpResponse, notFound} from '@/infrastructure/helpers/http';

export interface IActionController extends IController {
    action: any;
}

export abstract class ActionController<T_Action> implements IActionController {

    action: T_Action;

    protected constructor (action: T_Action) {
        if (action) this.action = action;
    }

    abstract handle = async (request: HttpRequest): Promise<HttpResponse> => {
        switch (this.action) {
            default: return notFound();
        }
    };

}
