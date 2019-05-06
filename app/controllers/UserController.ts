import { Controller } from '../utils/http/Controller';
import { User } from '../models/User';

export class UserController extends Controller {

    constructor(data) {
        super(data);
    }

    async getUsers() {
        let users = [
            {
                username: 'jappleseed01',
                email: 'sample@example.com',
                id: 1
            }
        ]

        let result = await new User().where();

        console.log(result)

        this.respondWithSuccess({data: result});
    }

    async addUser(request: any) {
        let input = request.body;
        let user = new User();

        user.username = input.username;
        user.email = input.email;
        user.password = input.password;

        user.save();

        this.respondWithSuccess();
    }

}