import {ActionResourceController} from '@/infrastructure/entry-points/gateways/controller/action-resource-controller';

export abstract class ActionResourceMiddleware<T_Action> extends ActionResourceController<T_Action> {}
