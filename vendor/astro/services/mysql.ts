import * as mysql from 'mysql';
import { DBConfig } from '../../../config/database.config';
import { DB, QueryResult, SQLQueryModel, SQLResultTransformer, ToMatch, Insert, Update } from './namespaces/Database';

export class DBQuery implements DB, SQLQueryModel {

    public instance: any;
    public connected: boolean;
    public model: string;

    constructor(model: string) {
        this.model = model;
        this.connect();
    }

    private async connect() {
        this.instance = mysql.createConnection({
            ...DBConfig.mysql,
            port: DBConfig.mysql.port || '3306'
        });

        this.instance.connect();
    }

    close() : void {
        if (this.instance)
            this.instance.end();
    }

    all() : Promise<QueryResult> {
        let query = "SELECT * FROM ??";
        let prepare = [
            this.model
        ];
        let serialized = mysql.format(query, prepare);

        return new Promise<QueryResult>((resolve: any, reject: any) => {
            this.instance.query(serialized, (err: any, result: any, fields: any) => {
                if (err)
                    throw new Error(err);

                resolve(SQLResultTransformer(result));
            });
        });
    }

    where(params: any) : Promise<QueryResult> {
        let query = "SELECT * FROM ?? WHERE ";
        let prepare = [
            this.model
        ];

        let i1 = 0;

        for (var i in params) {
            i1++;
            if (i1 !== Object.keys(params).length)
                query += `\`${i}\`` + " = ? AND ";
            else
                query += `\`${i}\`` + " = ?";
            
            prepare.push(params[i]);
        }

        let serialized = mysql.format(query, prepare);

        return new Promise<QueryResult>((resolve: any, reject: any) => {
            this.instance.query(serialized, (err: any, result: any, fields: any) => {
                if (err)
                    throw new Error(err);

                resolve(SQLResultTransformer(result));
            });
        });
    }

    insert(params: Insert[]) : Promise<QueryResult> {
        let query = "INSERT INTO ?? (";
        let prepare = [
            this.model
        ];

        for (let i = 0; i < params.length; i++) {
            if (i !== params.length - 1)
                query += params[i].key + ", ";
            else
                query += params[i].key + ") VALUES (";
            
            prepare.push(params[i].value);
        }

        for (let i = 1; i < prepare.length; i++) {
            if (i !== prepare.length - 1)
                query += "'" + prepare[i] + "', ";
            else
                query += "'" + prepare[i] + "')";
        }

        let serialized = mysql.format(query, prepare);

        return new Promise<QueryResult>((resolve: any, reject: any) => {
            this.instance.query(serialized, (err: any, result: any, fields: any) => {
                if (err)
                    throw new Error(err);

                if (result.insertId)
                    resolve(SQLResultTransformer(result.insertId));
                else
                    resolve();
            });
        })
    }

    update(params: Update) : Promise<QueryResult> {
        let query = "UPDATE ?? SET ";
        let prepare = [
            this.model
        ];

        let i1 = 0;
        let i2 = 0;

        for (var i in params.values) {
            i1++;
            if (i1 !== Object.keys(params.values).length)
                query += `\`${i}\`` + " = ?, ";
            else
                query += `\`${i}\`` + " = ? WHERE ";
            
            prepare.push(params[i]);
        }

        for (var i in params.where) {
            i2++;
            if (i2 !== Object.keys(params.where).length)
                query += "`" + i + "` = ? AND ";
            else
                query += "`" + i + "` = ?";

            prepare.push(params.where[i]);
        }

        let serialized = mysql.format(query, prepare);

        return new Promise<QueryResult>((res, rej) => {
            this.instance.query(serialized, (err: any, result: any, fields: any) => {
                if (err)
                    throw new Error(err);

                res(result);
            })
        });
    }

}