import { Response } from '../util/Response';

export class Middleware {

    private responseHandler: Response;

    constructor(private socket: any) {
        this.responseHandler = new Response(socket);
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