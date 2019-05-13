import { Model } from 'vendor/astro/http/Model';

export class User extends Model {

    public username: string;
    public email: string;
    public password: string;

    constructor() {
        super('users');

        this.table = 'users';
        this.fillable = [
            'username', 'email', 'password'
        ];
        this.noReturn = ['password'];
    }

}