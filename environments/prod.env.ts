import { Environment } from 'vendor/astro/entities/environment';
import Log from 'vendor/astro/util/Logger';
import { RouterConfig } from 'config/router.config';

export const ProdEnvironment: Environment = {
    trigger: 'prod', // The trigger used in NODE_ENV= | this supports arrays!
    useLocal: true,
    process: (): Promise<void|string> => {
        return new Promise(async (resolve, reject) => {
            try {
                Log('Starting server in production environment...');
                RouterConfig.log_requests = false;
                
                // Spawn
                require('../index');
                resolve();
            } catch (e) {
                reject(`${e}`);
            }
        });
    }
}
