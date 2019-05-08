import { DBQuery } from '../services/mysql';
import { SQLDataPipe } from '../pipes/SQLDataPipe';
import { QueryResult, SQLQueryModel, ToMatch, Insert } from '../services/namespaces/Database';

export class Model implements SQLQueryModel {

    public table: string;
    public fillable?: any[];
    public noReturn?: any[];

    private dbInstance: DBQuery;

    constructor(table: string) {
        this.dbInstance = new DBQuery(table);
    }

    where(to: string, from: string) : Promise<QueryResult> {
        return new Promise<QueryResult>((res, rej) => this.dbInstance.where(to, from).then((db: QueryResult) => { res(new SQLDataPipe(db, this.noReturn).run()); }));
    }

    whereArray(params: ToMatch[]) : Promise<QueryResult> {
        return new Promise<QueryResult>((res, rej) => this.dbInstance.whereArray(params).then((db: QueryResult) => { res(new SQLDataPipe(db, this.noReturn).run()); }));
    }

    all() : Promise<QueryResult> {
        return new Promise<QueryResult>((res, rej) => this.dbInstance.all().then((db: QueryResult) => { res(new SQLDataPipe(db, this.noReturn).run()); }));
    }

    insert(params: Insert[]) : Promise<QueryResult> {
        return new Promise<QueryResult>((res, rej) => this.dbInstance.insert(params).then((db: QueryResult) => { res(db); }));
    }

    update(params: any, where: any) : Promise<QueryResult> {
        return new Promise<QueryResult>((res, rej) => this.dbInstance.update(params, where).then((db: QueryResult) => { res(db); }));
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