import * as mysql from 'mysql';
import { DBConfig } from '../../../config/database.config';

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
        })
    }

}