import fs from 'fs';
import * as mysql from 'mysql';
import { DBConfig } from '../config/database.config';
import { Connection, createConnection } from 'typeorm';

(async () => {
    const instance: Connection = await createConnection({
        ...DBConfig.mysql,
        type: 'mysql'
    });

    let directories: Array<string> = await fs.readdirSync(__dirname + '/schema');

    for (let i = 0; i < directories.length; i++) {
        let dir = await fs.readFileSync(__dirname + '/schema/' + directories[i], "utf8");

        try {
            await instance.query(mysql.format(dir));

            console.log(`Migrated '${directories[i].replace(new RegExp(/.sql/, 'g'), '')}' successfully (${i+1}/${directories.length})`);

            if (i == directories.length - 1) {
                console.log(`Finished! Successfully completed ${directories.length} ${directories.length === 1 ? 'migration':'migrations'}.`); 
                return process.exit();
            }
        } catch (e) {
            throw new Error(e);
        }
    }
})();
