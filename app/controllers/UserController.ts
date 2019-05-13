import { Controller } from 'vendor/astro/http/Controller';
import { User } from 'app/models/User';

export class UserController extends Controller {

    constructor(data) {
        super(data);
    }

    async getUsers() {
        var users = await new User().all();
        
        return this.respondWithSuccess(users);
    }

    async getUser(request: Request) {
        var input = request.body;

        var user = await new User().where({
            username: input['username']
        });

        if (!user)
            return this.respondWithError(404);

        return this.respondWithSuccess(user);
    }

    async addUser(request: Request) {
        var input = request.body;
        var user = new User();

        user.username = input['username'];
        user.email = input['email'];
        user.password = input['password'];

        user.save();

        return this.respondWithSuccess();
    }

    async changeUsername(request: Request) {
        var input = request.body;

        new User().update({
            values: {
                username: input['newUsername'],
                email: input['newEmail']
            },
            where: {
                id: 1
            }
        });

        return this.respondWithSuccess();
    }

}
