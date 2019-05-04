import { DBQuery } from '../services/mysql';

export class Model {

    public table: string;
    public fillable?: any[];

    private dbInstance: DBQuery;

    constructor() {
        this.dbInstance = new DBQuery();
    }

    where(to: string, from: string) {
        return this.dbInstance.where(to, from, this.table);
    }

}