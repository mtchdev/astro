import { Middleware } from '../utils/http/Middleware';

export class AuthMiddleware extends Middleware {

    constructor(data) {
        super(data);
    }

    run() {
        return this.next();
    }

}