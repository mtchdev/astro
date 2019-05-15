const MiddlewareTemplate = `import { Middleware } from 'vendor/astro/http/Middleware';

export class MiddlewareName extends Middleware {

    constructor(data) {
        super(data);
    }

    run() {
        return this.next();
    }

}`;

import fs from 'fs';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

cli();

function cli() : void {
    rl.question('Middleware Name: ', (ans: string) => generate(MiddlewareTemplate, ans));
}

async function generate(template: string, cliName: string) {
    let temp = template.replace(/MiddlewareName/g, cliName);
    await fs.writeFileSync('app/middleware/' + cliName + '.ts', temp);
    setTimeout(() => {
        console.log('Successfully created ' + cliName + '.ts');
        rl.close();
    }, 250);
}