export const AppConfig = {
    name: process.env.APP_NAME || 'Astro',
    port: Number.parseInt(process.env.APP_PORT, 0x0) || 3000, // the server port
    environment: undefined // Environments: Development | Production
};
