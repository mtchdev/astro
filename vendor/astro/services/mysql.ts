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
                'app/models/*{.ts,.js}'
            ]
        });

        Logger.log('Connected to database.');
    } catch (e) {
        console.log('I FALL HERE')
        Logger.log(e);
    }
}

export var instance = connection;
