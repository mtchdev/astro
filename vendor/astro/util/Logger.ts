const chalk = require('chalk');

export class Logger {

    constructor() {}

    public static log = (message: string, state: string = 'info'): void => {
        const date = new Date();
        const newDate = `[${parseDate(date.getHours())}:${parseDate(date.getMinutes())}:${parseDate(date.getSeconds())}]`;
        const log = console.log;

        switch(state) {
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

        function parseDate(obj: any) {
            return ('0' + obj).slice(-2);
        }
    }

}