
import { Model } from 'vendor/astro/http/Model';

export class Post extends Model {

    constructor() {
        super('posts');

        this.table = 'posts'; // DB table name
        this.fillable = []; // Fillable DB columns
        this.noReturn = []; // Data to not return on a SELECT * FROM request
    }

}
