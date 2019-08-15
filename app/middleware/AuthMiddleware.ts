import { Middleware } from 'vendor/astro/http/Middleware';
import { Request } from 'express';

export class AuthMiddleware extends Middleware {

    constructor(private request: Request, data) {
        super(data);
    }

    run(): boolean {
        return this.next();
    }

}