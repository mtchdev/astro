const EnvTemplate = `import { Environment } from 'vendor/astro/entities/environment';
import Log from 'vendor/astro/util/Logger';

export const envName: Environment = {
    trigger: 'triggerName', // The trigger used in NODE_ENV=
    process: (): Promise<void|string> => {
        return new Promise(async (resolve, reject) => {
            try {
                Log('Starting server in triggerName environment...');
                
                // Spawn
                require('../index');
                resolve();
            } catch (e) {
                reject(\`\$\{\e\}\`);
            }
        });
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
    rl.question('Environment Trigger/Name: ', (name: string) => generate(EnvTemplate, name));
}

async function generate(template: string, cliName: string) {
    let slug = template.replace(/envName/g, cliName.charAt(0).toUpperCase() + cliName.slice(1).toLowerCase() + 'Environment');
    let temp = slug.replace(/triggerName/g, cliName.toLowerCase());
    await fs.writeFileSync('environments/' + cliName.toLowerCase() + '.env.ts', temp);
    setTimeout(() => {
        console.log('Successfully created ' + cliName.toLowerCase() + '.env.ts (' + cliName.charAt(0).toUpperCase() + cliName.slice(1).toLowerCase() + 'Environment' + ')\nYou will need to create a new script in package.json using NODE_ENV=' + cliName.toLowerCase() + '\nAND you will need to add ' + cliName.charAt(0).toUpperCase() + cliName.slice(1).toLowerCase() + 'Environment' + ' to the _environments.ts array.');
        rl.close();
    }, 250);
}
