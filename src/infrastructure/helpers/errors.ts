import {INTERNAL_SERVER_ERROR} from '@/infrastructure/helpers/constant';

export class ServerError extends Error {
    constructor(stack?: string) {
        super(INTERNAL_SERVER_ERROR);
        this.name = 'ServerError';
        this.stack = stack;
    }
}

export class UnauthorizedError extends Error {
    constructor(message: string = 'Email o contraseña incorrectos') {
        super(message);
        this.name = 'UnauthorizedError';
    }
}
