import { Instance } from '../services/instance';
import { Request, Response, Express } from 'express';
import { RouterConfig } from '../../../config/router.config';
import Log from '../util/Logger';

export class Http {

    private app: Express;
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

    get(url: string, callback: Function, middleware?: Array<object> | object): void {
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

    post(url: string, callback: Function, middleware?: any): void {
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

    put(url: string, callback: Function, middleware?: any): void {
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

    delete(url: string, callback: Function, middleware?: any): void {
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

    checkMiddlewareArray(middleware: Array<object>, res: any, req: Request): Promise<void> {
        return new Promise<void>((resolve: any, reject: any) => {
            let passed = [];
            for (let i = 0; i < middleware.length; i++) {
                this.middleware(middleware[i], res, req, () => passed.push(true));
                
                if (i == middleware.length - 1 && passed.length == middleware.length - 1)
                    resolve();
            }
        });
    }

    async middleware(controller: any, res: Response, req: Request, callback: Function) {
        let result: boolean = await new controller(req, res).run();
            
        if (result == true)
            callback(); // middleware passed
        else
            return;
    }

    verifyIp(req: Request, resp: Response): Promise<boolean> {
        return new Promise<boolean>((res, rej) => {
            if (RouterConfig.allowed_ips.length == 0) {
                this.logAccess(req);
                res(true);
            }
            for (let i = 0; i < RouterConfig.allowed_ips.length; i++) {
                if (RouterConfig.allowed_ips[i] == req.ip) {
                    this.logAccess(req);
                    res(true);
                }
                else {
                    return resp.send('Internal Error: ip_verif_fail. | IP \n\n' + req.ip + ' is not authorized to access this server.');
                }
            }
        });
    }

    private logAccess(req: Request): void {
        if (RouterConfig.log_requests) {
            Log(`${req.ip == '::1' ? '127.0.0.1':req.ip} accessed ${req.url}`);
        }
    }

}

export abstract class RouteResponses {
    public static NotFound = (req: Request): string => {
        Log(`${req.url} failed: 404 Not Found`);
        return `404: ${req.url} was not found on this server.`;
    };
}
