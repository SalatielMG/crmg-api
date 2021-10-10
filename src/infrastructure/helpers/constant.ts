export enum ROL {
    SUPER_ADMIN = 'Super Admin',
    ADMIN = 'Admin',
    AUX = 'Aux',
}

export const ACTION_CONTROLLER = {
    SEND_INVITATION: 'SEND_INVITATION',
    CONFIRM_EMAIL_TOKEN: 'CONFIRM_TOKEN_INVITATION',
    FORGOT_PASSWORD: 'FORGOT_PASSWORD',
    LOGIN: 'LOGIN',
};

export const OPERATION_NOt_FOUND = 'Operación no encontrada';
export const INTERNAL_SERVER_ERROR = 'El servicio no esta disponible, porfavor intenta más tarde';

export const REGEXS = {
    EMAIL: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
}

export const TYPES = {
    INVITATION: {
        VERIFICATION_EMAIL: 'VERIFICATION_EMAIL'
    }
}

