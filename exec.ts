import { AppConfig } from './config/app.config';
import { Logger } from './vendor/astro/util/Logger';
import { serve } from './vendor/astro/server/serve';
import { Instance } from 'vendor/astro/services/instance';

AppConfig.environment.process();

process.on('SIGINT', () => {
    Logger.log('Stopping server...', 'warn');
    // serve.halt(Instance.app);
    process.exit();
});
