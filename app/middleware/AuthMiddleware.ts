import { Middleware } from 'vendor/astro/http/Middleware';

export class AuthMiddleware extends Middleware {

    constructor(private request, data) {
        super(data);
    }

    run() {
        return this.next();
    }

}