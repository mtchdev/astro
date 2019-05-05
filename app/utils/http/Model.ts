import { DBQuery } from '../services/mysql';

interface ToMatch {
    match: string,
    with: any
}

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

    whereArray(params: ToMatch[]) {
        return this.dbInstance.whereArray(params, this.table);
    }

}