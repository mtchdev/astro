import { Controller } from 'vendor/astro/http/Controller';
import { User } from 'app/models/User';

export class UserController extends Controller {

    constructor(data) {
        super(data);
    }

    getUsers() {
        this.db.find(User);
    }

}
