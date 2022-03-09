import {ActionController} from '@/infrastructure/entry-points/gateways/controller/action-controller';

export abstract class ActionMiddleware<T_Action> extends ActionController<T_Action> {

}
