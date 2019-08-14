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

    respondWithError(state?: string | number, code?: number) : void {
        if (state && code) {
            this.responseHandler.error({message: state.toString(), status: code});
        } else if (state && typeof state === 'string') {
            this.responseHandler.error({message: state});
        } else if (state && typeof state === 'number') {
            this.responseHandler.error({status: state});
        }
    }

    setState(newObj: any) : void {
        this.state = {
            ...this.state,
            newObj
        };
        state.internal = newObj;
    }

}
