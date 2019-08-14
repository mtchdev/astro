import { Response } from '../util/Response';
import { state } from '../util/State';

import { getManager } from 'typeorm';

export class Controller {

    public state: any;
    public db = getManager();

    private responseHandler: Response;

    constructor(socket: any) {
        this.state = state.internal;
        this.responseHandler = new Response(socket);
    }

    respondWithSuccess(message?: any) : void {
        this.responseHandler.success(message);
    }

    respondWithError(message?: any) : void {
        this.responseHandler.error(message);
    }

    setState(newObj: any) : void {
        this.state = {
            ...this.state,
            newObj
        };
        state.internal = newObj;
    }

}
