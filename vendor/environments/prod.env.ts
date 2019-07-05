import { Environment } from './environment';
import { Logger } from '../astro/util/Logger';
import { RouterConfig } from 'config/router.config';

export const ProdEnvironment: Environment = {
    useLocal: true,
    process: (): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                Logger.log('Starting server in production environment...');
                RouterConfig.log_requests = false;
                
                // Spawn
                require('../../index.ts');
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }
}