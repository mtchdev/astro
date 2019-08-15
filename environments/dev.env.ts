import { Environment } from 'vendor/astro/entities/environment';
import Log from 'vendor/astro/util/Logger';
const ip = require('ip');

export const DevEnvironment: Environment = {
    trigger: 'dev', // The trigger used in NODE_ENV=
    useLocal: true,
    process: (): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                Log('Starting server in development environment...');
                
                // Spawn
                require('../index');
                if (ip.address() !== '127.0.0.1' || ip.address() !== '::1') {
                    Log('Host is not on a local address.', 'warn');
                }
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }
}
