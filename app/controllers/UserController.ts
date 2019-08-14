import { Controller } from 'vendor/astro/http/Controller';
import { Request } from 'express';
import { User } from 'app/models/User';

export class UserController extends Controller {

    constructor(data) {
        super(data);
    }

    async getUsers() {
        const users = await this.db.find(User);
        return this.respondWithSuccess(users);
    }

    async getUser(request: Request) {
        const user = await this.db.findOne(User, {
            where: {
                username: request.params.username
            }
        });

        if (!user) {
            return this.respondWithError('User not found.', 404);
        }

        return this.respondWithSuccess(user);
    }

}
