import { Environment } from './environment';
import Log from '../astro/util/Logger';
import { RouterConfig } from 'config/router.config';

export const ProdEnvironment: Environment = {
    useLocal: true,
    process: (): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                Log('Starting server in production environment...');
                RouterConfig.log_requests = false;
                
                // Spawn
                require('../../index');
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }
}