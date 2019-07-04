export class Logger {

    constructor() {}

    public static log = (message: string): void => {
        const date = new Date();
        console.log(`[${parseDate(date.getHours())}:${parseDate(date.getMinutes())}:${parseDate(date.getSeconds())}] > ${message}`);

        function parseDate(obj: any) {
            return ('0' + obj).slice(-2);
        }
    }

}