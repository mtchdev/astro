import { DBConfig } from '../../../config/database.config';
import { AppConfig } from '../../../config/app.config';
import Log from '../util/Logger';
import { Connection, createConnection, Entity } from 'typeorm';

var connection: Connection;

export async function createInstance() {
    if (connection) {
        return false;
    }

    if (!DBConfig.enabled) {
        return Log('Database integration is disabled.', 'warn');
    }

    try {
        let entityUrl: string = 'app/models/*{.js,ts}';
        let isDev = process.env.NODE_ENV === ('dev' || 'development');
        entityUrl = !isDev ? entityUrl = AppConfig.buildOutput + entityUrl:entityUrl;
        connection = await createConnection({
            ...DBConfig.mysql,
            type: 'mysql',
            entities: [
                entityUrl
            ]
        });

        Log('Connected to database.');
    } catch (e) {
        let error = <string>e.message;
        
        if (error.includes('ECONNREFUSED')) {
            Log(`DB: ${e}. Retrying...`, 'error');

            setTimeout(() => {
                createInstance();
            }, 5000);
        } else {
            console.log(e)
            Log(`DB: ${e}`, 'error');
        }
    }
}

export var instance = connection;
