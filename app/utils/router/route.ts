import { Http } from './http';
import { Instance } from '../services/instance';

interface RouteParams {
    url: string,
    controller: any,
    middleware?: any,
    method: string,
}

export class Route {

    constructor(private params: RouteParams) {
        this.run();
    }

    run() {

        var http = new Http(Instance.app);
        
        if (this.params.method == 'GET')
            http.get(this.params.url, (req: any, res: any) => {
                this.params.controller;
            });
        
    }

}