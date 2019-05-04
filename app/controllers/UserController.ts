import { Controller } from '../utils/http/Controller';

export class UserController extends Controller {

    constructor(data) {
        super(data);
    }

    getUsers() {
        let users = [
            {
                username: 'jappleseed01',
                email: 'sample@example.com',
                id: 1
            }
        ]

        this.respondWithSuccess({data: users});
    }

}