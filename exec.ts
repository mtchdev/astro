import { AppConfig } from './config/app.config';
import { Logger } from './vendor/astro/util/Logger';
import { serve } from './vendor/astro/server/serve';

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
