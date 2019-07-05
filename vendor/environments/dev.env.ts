import { Environment } from './environment';
import { Logger } from '../astro/util/Logger';
const ip = require('ip');

export const DevEnvironment: Environment = {
    useLocal: true,
    process: (): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.log('Starting server in development environment...');
                
                // Spawn
                require('../../index.ts');
                if (ip.address() !== '127.0.0.1' || ip.address() !== '::1') {
                    Logger.log('Host is not on a local address.', 'warn');
                }
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }
}