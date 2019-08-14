import { AppConfig } from './config/app.config';
import { Logger } from './vendor/astro/util/Logger';
import { serve } from './vendor/astro/server/serve';
import { existsSync } from 'fs';

if (!existsSync(__dirname + '\\.env')) {
    Logger.log('Environment not found. Please rename .env.example to .env', 'error');
    process.exit();
}

AppConfig.environment.process();

process.on('SIGINT', () => {
    serve.halt();
});

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (chunk: string) => {
    switch (chunk) {
        // an elegant way to stop the process
        case "stop":
            serve.halt();
            break;
    }
});
