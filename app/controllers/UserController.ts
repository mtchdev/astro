import { Controller } from 'vendor/astro/http/Controller';
import { User } from 'app/models/User';

export class UserController extends Controller {

    constructor(data) {
        super(data);
    }

    async getUsers() {
        //var users = await new User().all();
        var users = await new User().where({
            username: 'test',
            id: 1
        });

        this.respondWithSuccess({data: users});
    }

    async addUser(request: any) {
        var input = request.body;
        var user = new User();

        user.username = input.username;
        user.email = input.email;
        user.password = input.password;

        await user.save();

        this.respondWithSuccess();
    }

    async updateUser(request: any) {
        var input = request.body;

        await new User().update({
            values: {
                username: 'john'
            },
            where: {
                id: 1
            }
        });
    }

}