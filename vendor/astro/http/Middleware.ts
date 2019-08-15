import { Responder } from '../util/Response';
import { Response } from 'express';

export class Middleware {

    private responseHandler: Responder;

    constructor(socket: Response) {
        this.responseHandler = new Responder(socket);
    }

    next() {
        return true;
    }

    exit() {
        this.responseHandler.error({
            message: '403: Denied',
            status: 403,
            data: {error: 'middleware_fail'}
        });
        
        return false;
    }

}