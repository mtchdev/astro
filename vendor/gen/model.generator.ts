const ModelTemplate = `import { Model } from 'vendor/astro/http/Model';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity(tableName)
export class modelName extends Model {

}
`;

import fs from 'fs';
import * as readline from 'readline';
import { DBConfig } from '../../config/database.config';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

cli();

function cli():void {
    if (!DBConfig.enabled) {
        console.log('Warning! Database integration is disabled in database.config\n\n');
    }

    rl.question('Model Name: ', (name: string) => {
        rl.question('DB Table: ', (table: string) => generate(ModelTemplate, name, table));
    });
}

async function generate(template: string, cliName: string, cliTable: string) {
    let slug = template.replace(/modelName/g, cliName);
    let temp = slug.replace(/tableName/g, "'" + cliTable + "'");
    await fs.writeFileSync('app/models/' + cliName + '.ts', temp);
    setTimeout(() => {
        console.log('Successfully created ' + cliName + '.ts');
        rl.close();
    }, 250);
}