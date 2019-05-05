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
        await new User().insert([
            {
                key: 'guild_id',
                value: '8'
            },
            {
                key: 'owner_id',
                value: 's'
            }
        ]);

        this.respondWithSuccess();
    }

}