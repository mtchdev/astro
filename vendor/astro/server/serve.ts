import { AppConfig } from '../../../config/app.config';
import { RouterConfig } from '../../../config/router.config';
import { Logger } from '../util/Logger';

const ip = require('ip');

export var serve = {
    up: (express: any) => {
        if (typeof AppConfig.port !== 'number')
            throw new Error('Port is not a number.');

        express.listen(AppConfig.port, () => Logger.log(`Server running on host ${ip.address()}:${AppConfig.port}`, 'success')).on('error', (data) => {
            switch (data.code) {
                case "EADDRINUSE":
                    Logger.log(`Port ${AppConfig.port} is already in use.`, 'error');
                    break;
                default:
                    Logger.log('A fatal error occured while trying to create the server.', 'error');
                    break;
            }

            process.exit();
        });
        if (RouterConfig.log_requests) {
            Logger.log('Router log mode enabled. All requests will be logged.');
        }
    },
    halt: (instance: any) => {
        instance.close();
        return console.info('Server instance shut down.');
    }
}