import { DBQuery } from '../services/mysql';
import { SQLDataPipe } from '../pipes/SQLDataPipe';

interface ToMatch {
    match: string,
    with: any
}

interface Insert {
    key: string,
    value: string
}

export class Model {

    public table: string;
    public fillable?: any[];
    public noReturn?: any[];

    private dbInstance: DBQuery;

    constructor() {
        this.dbInstance = new DBQuery();
    }

    async where(to?: string, from?: string) {
        let db = await this.dbInstance.where(to, from, this.table);
        return await new SQLDataPipe(db, this.noReturn).run();
    }

    whereArray(params: ToMatch[]) {
        return this.dbInstance.whereArray(params, this.table);
    }

    async all() {
        let db = await this.dbInstance.all(this.table);
        return await new SQLDataPipe(db, this.noReturn).run();
    }

    insert(params: Insert[]) {
        return this.dbInstance.insert(params, this.table);
    }

    async save() {
        let fillable = this.fillable;
        let filledValues = [];

        for (let i in fillable)
            filledValues.push({
                key: fillable[i],
                value: eval("this." + fillable[i])
            });

        return await this.insert(filledValues);
    }

}