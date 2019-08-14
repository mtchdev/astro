import { DevEnvironment } from '../vendor/environments/dev.env';
import { ProdEnvironment } from '../vendor/environments/prod.env';

export const AppConfig = {
    name: process.env.APP_NAME || 'Astro',
    port: Number.parseInt(process.env.APP_PORT, 0x0) || 3000, // the server port
    environment: ProdEnvironment, // Environments: Development | Production
    buildOutput: 'build/' // This is for internal reasons; you should also change this in tsconfig.json to actually build to this path
};
