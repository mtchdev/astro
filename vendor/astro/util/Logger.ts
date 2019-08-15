const chalk = require('chalk');

type LoggerStates = 'warn' | 'info' | 'error' | 'success';

export default function Log<T = string | number | object>(message: T, level: LoggerStates = 'info'): void {
    const date = new Date();
    const newDate = `[${parseDate(date.getHours())}:${parseDate(date.getMinutes())}:${parseDate(date.getSeconds())}]`;
    const log = console.log;

    switch(level) {
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
}

function parseDate(obj: number): string {
    return ('0' + obj).slice(-2).toString();
}
