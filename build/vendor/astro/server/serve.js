"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_1 = require("../../../config/app.config");
const router_config_1 = require("../../../config/router.config");
const Logger_1 = require("../util/Logger");
const ip = require('ip');
exports.serve = {
    up: (express) => {
        if (typeof app_config_1.AppConfig.port !== 'number')
            throw new Error('Port is not a number.');
        express.listen(app_config_1.AppConfig.port, () => Logger_1.Logger.log(`Server running on host ${ip.address()}:${app_config_1.AppConfig.port}`, 'success')).on('error', (data) => {
            switch (data.code) {
                case "EADDRINUSE":
                    Logger_1.Logger.log(`Port ${app_config_1.AppConfig.port} is already in use.`, 'error');
                    break;
                default:
                    Logger_1.Logger.log('A fatal error occured while trying to create the server.', 'error');
                    break;
            }
            process.exit();
        });
        if (router_config_1.RouterConfig.log_requests) {
            Logger_1.Logger.log('Router log mode enabled. All requests will be logged.');
        }
    },
    halt: () => {
        Logger_1.Logger.log('Server shutting down...', 'warn');
        process.exit();
    }
};
//# sourceMappingURL=serve.js.map