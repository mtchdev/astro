import { Model } from 'vendor/astro/http/Model';

export class User extends Model {

    public username: string;
    public email: string;
    public password: string;
    public id: number;

    constructor() {
        super('users');

        this.table = 'users'; // DB table name
        this.fillable = ['username', 'email', 'password']; // Fillable DB columns
        this.noReturn = []; // Data to not return on a SELECT * FROM request
    }

}
