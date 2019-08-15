import { AppConfig } from '../../../config/app.config';
import { RouterConfig } from '../../../config/router.config';
import Log from '../util/Logger';
import { Express } from 'express';

const ip = require('ip');

export var serve = {
    up: (express: Express): void => {
        if (typeof AppConfig.port !== 'number')
            throw new Error('Port is not a number.');

        express.listen(AppConfig.port, () => Log(`Server running on host ${ip.address()}:${AppConfig.port}`, 'success')).on('error', (error: any) => {
            switch (error.code) {
                case "EADDRINUSE":
                    Log(`Port ${AppConfig.port} is already in use.`, 'error');
                    break;
                default:
                    Log('A fatal error occured while trying to create the server.', 'error');
                    break;
            }

            process.exit();
        });
        if (RouterConfig.log_requests) {
            Log('Router log mode enabled. All requests will be logged.');
        }
    },
    halt: (): void => {
        Log('Server shutting down...', 'warn');
        process.exit();
    }
}