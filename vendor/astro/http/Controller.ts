import { Responder } from '../util/Response';
import { state, StateInterface } from '../util/State';
import { Response } from 'express';

import { getManager, EntityManager } from 'typeorm';

export class Controller {

    public state: any;
    public db: EntityManager = getManager();

    private responseHandler: Responder;

    constructor(socket: Response) {
        this.state = <object>state.internal;
        this.responseHandler = new Responder(socket);
    }

    respondWithSuccess<T = never>(message?: T): Response {
        if (!message) {
            return this.responseHandler.success();
        }
        if (typeof message === 'string') {
            this.responseHandler.success({message: message});
        } else if (typeof message === 'number') {
            this.responseHandler.success({status: message});
        } else {
            this.responseHandler.success({data: message, message: 'success'});
        }
    }

    respondWithError<T = never>(state?: T, code?: number): Response {
        if (!state) {
            return this.responseHandler.error();
        }
        if (state && code) {
            this.responseHandler.error({message: state.toString(), status: code});
        } else if (state && typeof state === 'string') {
            this.responseHandler.error({message: state});
        } else if (state && typeof state === 'number') {
            this.responseHandler.error({status: state});
        } else {
            this.responseHandler.error({data: state});
        }
    }

    setState(newObj: object): StateInterface {
        this.state = {
            ...this.state,
            newObj
        };
        state.internal = this.state;

        return this.state;
    }

}
