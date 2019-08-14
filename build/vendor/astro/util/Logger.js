"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require('chalk');
class Logger {
    constructor() { }
}
Logger.log = (message, state = 'info') => {
    const date = new Date();
    const newDate = `[${parseDate(date.getHours())}:${parseDate(date.getMinutes())}:${parseDate(date.getSeconds())}]`;
    const log = console.log;
    switch (state) {
        case "warn":
            log(`${newDate} ${chalk.bgYellow('WARN')} > ${message}`);
            break;
        case "info":
            log(`${newDate} ${chalk.bgCyan('INFO')} > ${message}`);
            break;
        case "error":
            log(`${newDate} ${chalk.bgRed('ERROR')} > ${message}`);
            break;
        case "success":
            log(`${newDate} ${chalk.bgGreen('SUCCESS')} > ${message}`);
            break;
    }
    function parseDate(obj) {
        return ('0' + obj).slice(-2);
    }
};
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map