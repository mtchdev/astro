import { Model } from '../utils/http/Model';

export class User extends Model {

    public username: string;
    public email: string;
    public password: string;

    constructor() {
        super();

        this.table = 'users';
        this.fillable = [
            'username', 'email', 'password'
        ];
    }

}