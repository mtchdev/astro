const ControllerTemplate = `import { Controller } from 'vendor/astro/http/Controller';
import { Request } from 'express';

export class ControllerName extends Controller {
    
    constructor(data) {
        super(data);
    }

}

`;

import fs from 'fs';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

cli();

function cli(): void {
    rl.question('Controller Name: ', (ans: string) => generate(ControllerTemplate, ans));
}

async function generate(template: string, cliName: string) {
    let temp = template.replace(/ControllerName/g, cliName);
    await fs.writeFileSync('app/controllers/' + cliName + '.ts', temp);
    setTimeout(() => {
        console.log('Successfully created ' + cliName + '.ts');
        rl.close();
    }, 250);
}