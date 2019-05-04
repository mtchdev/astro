import { Instance } from '../services/instance';

export class Http {

    private app: any;

    constructor() {
        this.app = Instance.app;
    }

    get(url: string, callback: any) {
        if (typeof callback !== 'function')
            throw new Error('Callback must be a function.');

        this.app.get('/' + url, (req: any, res: any) => callback(req, res));
    }

}