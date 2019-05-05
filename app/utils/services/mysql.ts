import * as mysql from 'mysql';
import { DBConfig } from '../../../config/database.config';

interface ToMatch {
    match: string,
    with: any
}

interface Insert {
    key: string,
    value: string
}

export class DBQuery {

    private connection: any;

    constructor() {
        this.connect();
    }

    connect() : void {
        this.connection = mysql.createConnection({
            ...DBConfig.mysql
        });

        this.connection.connect();
    }

    close() : void {
        if (this.connection)
            this.connection.end();
    }

    where(toMatch: string, match: string, model: string) : Promise<any> {
        let query = "SELECT * FROM ?? WHERE ?? = ?";
        let prepare = [
            model,
            toMatch,
            match
        ];
        let serialized = mysql.format(query, prepare);

        return new Promise<any>((resolve: any, reject: any) => {
            this.connection.query(serialized, (err: any, result: any, fields: any) => {
                if (err)
                    throw new Error(err);

                resolve(result);
            });
        });
    }

    whereArray(params: ToMatch[], model: string) : Promise<any> {
        let query = "SELECT * FROM ?? WHERE ?? = ?";
        let prepare = [
            model
        ];

        for (let i = 0; i < params.length; i++) {
            if (i == 1)
                query += " AND ?? = ?";

            prepare.push(params[i].match);
            prepare.push(params[i].with);
        }

        let serialized = mysql.format(query, prepare);

        return new Promise<any>((resolve: any, reject: any) => {
            this.connection.query(serialized, (err: any, result: any, fields: any) => {
                if (err)
                    throw new Error(err);

                resolve(result);
            });
        });
    }

    insert(params: Insert[], model: string) : Promise<any> {
        let query = "INSERT INTO ?? (";
        let prepare = [
            model
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

        return new Promise<any>((resolve: any, reject: any) => {
            this.connection.query(serialized, (err: any, result: any, fields: any) => {
                if (err)
                    throw new Error(err);

                resolve(result);
            });
        })
    }

}