import fs from 'fs';
import mysql from 'mysql';
import { DBConfig } from '../config/database.config';

const instance = mysql.createConnection({
    ...DBConfig.mysql,
    port: DBConfig.mysql.port || '3306'
});

instance.connect();

generate();

async function generate() {
    let directories = await fs.readdirSync(__dirname + '/schema');

    for (let i = 0; i < directories.length; i++) {
        let dir = await fs.readFileSync(__dirname + '/schema/' + directories[i], "utf8");
        await instance.query(mysql.format(dir), (err: any, success: any) => {
            if (err) {
                throw new Error(err);
            }

            console.log('Migrated ' + directories[i] + ' successfully.');

            if (i == directories.length - 1) {
                console.log('Finished!');
                return process.exit();
            }
        });
    }
}