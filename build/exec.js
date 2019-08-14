"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_1 = require("./config/app.config");
const Logger_1 = require("./vendor/astro/util/Logger");
const serve_1 = require("./vendor/astro/server/serve");
const fs_1 = require("fs");
if (!fs_1.existsSync(__dirname + '\\.env')) {
    Logger_1.Logger.log('Environment not found. Please rename .env.example to .env', 'error');
    process.exit();
}
app_config_1.AppConfig.environment.process();
process.on('SIGINT', () => {
    serve_1.serve.halt();
});
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
rl.on('line', (chunk) => {
    switch (chunk) {
        case "stop":
            serve_1.serve.halt();
            break;
    }
});
//# sourceMappingURL=exec.js.map