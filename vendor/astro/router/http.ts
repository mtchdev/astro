import { Instance } from '../services/instance';
import { RouterConfig } from '../../../config/router.config';

export class Http {

    private app: any;
    private urlPrefix: string;

    constructor() {
        this.app = Instance.app;
        
        if (RouterConfig.api_prefix == '' || RouterConfig.api_prefix == null)
            this.urlPrefix = '/';
        else
            this.urlPrefix = '/' + RouterConfig.api_prefix + '/';

        if (RouterConfig.api_version !== '' || RouterConfig.api_version !== null)
            this.urlPrefix += RouterConfig.api_version + '/';
    }

    get(url: string, callback: any, middleware?: any) {
        if (typeof callback !== 'function')
            throw new Error('Callback must be a function.');

        this.app.get(this.urlPrefix + url, async (req: Request, res: Response) => {
            await this.verifyIp(req, res);

            if (middleware == undefined)
                return callback(req, res);

            if (middleware instanceof Array)
                this.checkMiddlewareArray(middleware, res, req).then(() => {
                    callback(req, res);
                });
            else
                this.middleware(middleware, res, req, () => callback(req, res));
        });
    }

    post(url: string, callback: any, middleware?: any) {
        if (typeof callback !== 'function')
            throw new Error('Callback must be a function.');

        this.app.post(this.urlPrefix + url, async (req: Request, res: Response) => {
            await this.verifyIp(req, res);

            if (middleware == undefined)
                return callback(req, res);

            if (middleware instanceof Array)
                this.checkMiddlewareArray(middleware, res, req).then(() => {
                    callback(req, res);
                });
            else
                this.middleware(middleware, res, req, () => callback(req, res));
        });
    }

    put(url: string, callback: any, middleware?: any) {
        if (typeof callback !== 'function')
            throw new Error('Callback must be a function.');

        this.app.put(this.urlPrefix + url, async (req: Request, res: Response) => {
            await this.verifyIp(req, res);

            if (middleware == undefined)
                return callback(req, res);

            if (middleware instanceof Array)
                this.checkMiddlewareArray(middleware, res, req).then(() => {
                    callback(req, res);
                });
            else
                this.middleware(middleware, res, req, () => callback(req, res));
        });
    }

    delete(url: string, callback: any, middleware?: any) {
        if (typeof callback !== 'function')
            throw new Error('Callback must be a function.');

        this.app.delete(this.urlPrefix + url, async (req: Request, res: Response) => {
            
            await this.verifyIp(req, res);

            if (middleware == undefined)
                return callback(req, res);

            if (middleware instanceof Array)
                this.checkMiddlewareArray(middleware, res, req).then(() => {
                    callback(req, res);
                });
            else
                this.middleware(middleware, res, req, () => callback(req, res));
        });
    }

    checkMiddlewareArray(middleware: any[], res: any, req: any) : Promise<any> {
        return new Promise<any>((resolve: any, reject: any) => {
            let passed = [];
            for (let i = 0; i < middleware.length; i++) {
                this.middleware(middleware[i], res, req, () => passed.push(true));
                
                if (i == middleware.length - 1 && passed.length == middleware.length - 1)
                    resolve();
            }
        });
    }

    async middleware(controller: any, socket: any, request: any, callback: any) {
        if (typeof callback !== 'function')
            throw new Error('Callback on middleware is not a function.');

        let res = await new controller(request, socket).run();
        
        if (typeof res !== 'boolean')
            throw new Error('Middleware return value is not a boolean.');
            
        if (res == true)
            callback(); // middleware passed
        else
            return;
    }

    verifyIp(req: any, resp: any) : Promise<boolean> {
        return new Promise<boolean>((res, rej) => {
            if (RouterConfig.allowed_ips.length == 0)
                return res(true);
            for (let i = 0; i < RouterConfig.allowed_ips.length; i++) {
                if (RouterConfig.allowed_ips[i] == req.ip)
                    res(true);
                else {
                    return resp.send('Internal Error: ip_verif_fail. | IP \n\n' + req.ip + ' is not authorized to access this server.');
                }
            }
        });
    }

}