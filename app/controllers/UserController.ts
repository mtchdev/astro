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

        let result = await new User().where('id', '3');

        console.log(result)

        this.respondWithSuccess({data: result});
    }

}