import fs from 'fs';
import mysql from 'mysql';
import { DBConfig } from '../config/database.config';

const instance = mysql.createConnection({
    ...DBConfig.mysql,
    port: DBConfig.mysql.port || '3306'
});

instance.connect();

(async () => {
    let directories = await fs.readdirSync(__dirname + '/schema');

    for (let i = 0; i < directories.length; i++) {
        let dir = await fs.readFileSync(__dirname + '/schema/' + directories[i], "utf8");
        instance.query(mysql.format(dir), (err: any) => {
            if (err) {
                throw new Error(err);
            }

            console.log('Migrated ' + directories[i].replace(new RegExp(/.sql/, 'g'), '') + ' successfully.');

            if (i == directories.length - 1) {
                console.log(`Finished! Successfully completed ${directories.length} ${directories.length === 1 ? 'migration' : 'migrations'}.`); 
                return process.exit();
            }
        });
    }
})();