import { AppConfig } from '../../../config/app.config';
import { RouterConfig } from '../../../config/router.config';
import { Logger } from '../util/Logger';

const ip = require('ip');

export var serve = {
    up: (express: any) => {
        if (typeof AppConfig.port !== 'number')
            throw new Error('Port is not a number.');

        express.listen(AppConfig.port, () => Logger.log(`Server running on host ${ip.address()}:${AppConfig.port}`));
        if (RouterConfig.log_requests) {
            Logger.log('Router log mode enabled. All requests will be logged.');
        }
    },
    halt: (instance: any) => {
        instance.close();
        return console.info('Server instance shut down.');
    }
}