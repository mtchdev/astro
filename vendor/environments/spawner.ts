import { DevEnvironment } from 'vendor/environments/dev.env';
import { ProdEnvironment } from 'vendor/environments/prod.env';

export function envSpawner(): void {
    let env = process.env.NODE_ENV;

    if (!env) throw new Error('Environment not set.');

    switch (env) {
        case 'prod':
        case 'production':
            ProdEnvironment.process();
            break;

        case 'dev':
        case 'development':
            DevEnvironment.process();
            break;

        default:
            throw new Error('Environment does not exist.');
            break;
    }
}
