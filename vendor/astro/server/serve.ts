import { AppConfig } from '../../../config/app.config';

export var serve = {
    up: (express: any) => {
        if (typeof AppConfig.port !== 'number')
            throw new Error('Port is not a number.');

        express.listen(AppConfig.port, () => console.info('Server running on port ' + AppConfig.port + '.'));
    },
    halt: (instance: any) => {
        instance.close();
        return console.info('Server instance shut down.');
    }
}