import * as mysql from 'mysql';
import { DBConfig } from '../../../config/database.config';
import { DB, QueryResult, SQLQueryModel, SQLResultTransformer, ToMatch, Insert } from './namespaces/Database';

export class DBQuery implements DB, SQLQueryModel {

    public instance: any;
    public connected: boolean;
    public model: string;

    constructor() {
        this.connect();
    }

    private async connect() {
        this.instance.instance = mysql.createConnection({
            ...DBConfig.mysql
        });

        this.instance.instance.connect();
    }

    close() : void {
        if (this.instance)
            this.instance.end();
    }

    where(toMatch: string, match: string) : Promise<QueryResult> {
        let query = "SELECT * FROM ?? WHERE ?? = ?";
        let prepare = [
            this.model,
            toMatch,
            match
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

    whereArray(params: ToMatch[]) : Promise<QueryResult> {
        let query = "SELECT * FROM ?? WHERE ?? = ?";
        let prepare = [
            this.model
        ];

        for (let i = 0; i < params.length; i++) {
            if (i == 1)
                query += " AND ?? = ?";

            prepare.push(params[i].match);
            prepare.push(params[i].with);
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

}