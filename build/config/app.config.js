"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dev_env_1 = require("../vendor/environments/dev.env");
exports.AppConfig = {
    name: process.env.APP_NAME || 'Astro',
    port: Number.parseInt(process.env.APP_PORT, 0x0) || 3000,
    environment: dev_env_1.DevEnvironment
};
//# sourceMappingURL=app.config.js.map