import { Response } from '../util/Response';

export class Controller {

    private responseHandler: Response;

    constructor(socket: any) {
        this.responseHandler = new Response(socket);
    }

    respondWithSuccess(message?: any) : void {
        this.responseHandler.success(message);
    }

    respondWithError(message?: any) : void {
        this.responseHandler.error(message);
    }

}