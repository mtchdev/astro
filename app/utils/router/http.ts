import { Instance } from '../services/instance';
import { AppConfig } from '../../../config/app.config';

export class Http {

    private app: any;
    private urlPrefix: string;

    constructor() {
        this.app = Instance.app;
        
        if (AppConfig.routes.api_prefix == '' || AppConfig.routes.api_prefix == null)
            this.urlPrefix = '/';
        else
            this.urlPrefix = '/' + AppConfig.routes.api_prefix + '/';
    }

    get(url: string, callback: any, middleware?: any) {
        if (typeof callback !== 'function')
            throw new Error('Callback must be a function.');

        this.app.get(this.urlPrefix + url, (req: any, res: any) => {
            if (middleware == undefined)
                return callback(req, res);

            if (middleware instanceof Array)
                this.checkMiddlewareArray(middleware, res).then(() => {
                    callback(req, res);
                });
            else
                this.middleware(middleware, res, () => callback(req, res));
        });
    }

    post(url: string, callback: any, middleware?: any) {
        if (typeof callback !== 'function')
        throw new Error('Callback must be a function.');

        this.app.post(this.urlPrefix + url, (req: any, res: any) => {
            if (middleware == undefined)
                return callback(req, res);

            if (middleware instanceof Array)
                this.checkMiddlewareArray(middleware, res).then(() => {
                    callback(req, res);
                });
            else
                this.middleware(middleware, res, () => callback(req, res));
        });
    }

    checkMiddlewareArray(middleware: any[], res: any) : Promise<any> {
        return new Promise<any>((resolve: any, reject: any) => {
            let passed = [];
            for (let i = 0; i < middleware.length; i++) {
                this.middleware(middleware[i], res, () => passed.push(true));
                
                if (i == middleware.length - 1 && passed.length == middleware.length - 1)
                    resolve();
            }
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