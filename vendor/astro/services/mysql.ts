import { DBConfig } from '../../../config/database.config';
import { Logger } from '../util/Logger';
import { Connection, createConnection } from 'typeorm';

var connection: Connection;

export async function createInstance() {
    if (connection) {
        return false;
    }

    try {
        connection = await createConnection({
            ...DBConfig.mysql,
            type: 'mysql',
            entities: [
                'app/entities/*{.ts,.js}'
            ]
        });

        Logger.log('Connected to database.');
    } catch (e) {
        let error = <string>e.message;
        
        if (error.includes('ECONNREFUSED')) {
            Logger.log(`${e}. Retrying...`, 'error');

            setTimeout(() => {
                createInstance();
            }, 5000);
        } else {
            Logger.log(e, 'error');
        }
    }
}

export var instance = connection;
