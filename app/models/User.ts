import { Model } from '../utils/http/Model';

export class User extends Model {

    constructor() {
        super();

        this.table = 'guilds';
    }

}