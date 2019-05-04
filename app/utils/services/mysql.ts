import * as mysql from 'mysql';
import { DBConfig } from '../../../config/database.config';

export class DBQuery {

    private connection: any;

    constructor() {
        this.connect();
    }

    connect() {
        this.connection = mysql.createConnection({
            ...DBConfig.mysql
        });

        this.connection.connect();
    }

    close() {
        if (this.connection)
            this.connection.end();
    }

    where(toMatch: string, match: string, model: string) {
        this.connection.query('SELECT FROM `'+model+'` WHERE `'+toMatch+'` = "'+match+'"', (err: any, result: any, fields: any) => {
            if (err)
                throw new Error(err);

            return result;
        });
    }

}