export class Http {

    constructor(private app: any) {

    }

    get(url: string, callback: any) {
        if (typeof callback !== 'function')
            throw new Error('Callback must be a function.');

        this.app.get('/' + url, (req: any, res: any) => callback(req, res));
    }

}