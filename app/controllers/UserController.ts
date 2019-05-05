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

        let result = await new User().whereArray([
            {
                match: 'id',
                with: 3
            }
        ]);

        console.log(result)

        this.respondWithSuccess({data: result});
    }

    async addUser(request: Request) {
        this.respondWithSuccess(request.headers);
    }

}