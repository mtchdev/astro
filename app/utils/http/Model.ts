import { DBQuery } from '../services/mysql';

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

    insert(params: Insert[]) {
        return this.dbInstance.insert(params, this.table);
    }

    save() {
        let fillable = this.fillable;
        let filledValues = [];

        for (let i in fillable)
            filledValues.push({
                key: fillable[i],
                value: eval("this." + fillable[i])
            });

        this.insert(filledValues);
    }

}