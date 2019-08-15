import { AppConfig } from './config/app.config';
import Log from 'vendor/astro/util/Logger';
import { serve } from 'vendor/astro/server/serve';
import { existsSync } from 'fs';
import { EnvSpawner } from 'vendor/astro/services/envSpawner';

if (!existsSync(__dirname.replace(new RegExp(/\\/, 'g'), '/') + '/.env')) {
    Log('Environment not found. Please rename .env.example to .env', 'error');
    process.exit();
}

EnvSpawner.spawn();

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
