import { Instance } from '../services/instance';

export class Http {

    private app: any;

    constructor() {
        this.app = Instance.app;
    }

    get(url: string, callback: any, middleware?: any) {
        if (typeof callback !== 'function')
            throw new Error('Callback must be a function.');

        this.app.get('/' + url, (req: any, res: any) => {
            if (middleware !== undefined) {
                this.middleware(middleware, res, () => callback(req, res));
            }
            else 
                callback();
        });
    }

    async middleware(controller: any, socket: any, callback: any) {
        if (typeof callback !== 'function')
            throw new Error('Callback on middleware is not a function.');

        let res = await new controller(socket).run();
        
        if (typeof res !== 'boolean')
            throw new Error('Middleware return value is not a boolean.');
            
        if (res == true)
            callback(); // middleware passed
        else
            return;
    }

}