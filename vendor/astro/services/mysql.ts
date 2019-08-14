import { DBConfig } from '../../../config/database.config';
import { AppConfig } from '../../../config/app.config';
import { Logger } from '../util/Logger';
import { Connection, createConnection, Entity } from 'typeorm';

var connection: Connection;

export async function createInstance() {
    if (connection) {
        return false;
    }

    if (!DBConfig.enabled) {
        return Logger.log('Database integration is disabled.', 'warn');
    }

    try {
        let entityUrl: string = 'app/models/*{.js,ts}';
        entityUrl = !AppConfig.environment.isDev ? entityUrl = AppConfig.buildOutput + entityUrl : entityUrl;
        connection = await createConnection({
            ...DBConfig.mysql,
            type: 'mysql',
            entities: [
                entityUrl
            ]
        });

        Logger.log('Connected to database.');
    } catch (e) {
        let error = <string>e.message;
        
        if (error.includes('ECONNREFUSED')) {
            Logger.log(`DB: ${e}. Retrying...`, 'error');

            setTimeout(() => {
                createInstance();
            }, 5000);
        } else {
            console.log(e)
            Logger.log(`DB: ${e}`, 'error');
        }
    }
}

export var instance = connection;
