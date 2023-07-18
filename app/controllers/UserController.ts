import { Controller } from 'vendor/astro/http/Controller';
import { Request } from 'express';
import { User } from 'app/models/User';
import bcrypt from 'bcryptjs';

export class UserController extends Controller {
    
    constructor(data) {
        super(data);
    }

    async getUsers() {
        const users: Array<User> = await this.db.find(User);
        return this.respondWithSuccess(users);
    }

    async getUser(request: Request) {
        const user: User = await this.db.findOne(User, {
            where: {
                username: request.params.username
            }
        });

        if (!user) {
            return this.respondWithError('User not found.', 404);
        }

        return this.respondWithSuccess(user);
    }

    async addUser(request: Request) {
        let user = new User();
        user.username = request.body.username;
        user.email = request.body.email;
        user.password = await bcrypt.hash(request.body.password, 10);
        this.db.save(user);

        return this.respondWithSuccess();
    }

}
