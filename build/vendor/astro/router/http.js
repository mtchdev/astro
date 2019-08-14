"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const instance_1 = require("../services/instance");
const router_config_1 = require("../../../config/router.config");
const Logger_1 = require("../util/Logger");
class Http {
    constructor() {
        this.app = instance_1.Instance.app;
        if (router_config_1.RouterConfig.api_prefix == '' || router_config_1.RouterConfig.api_prefix == null)
            this.urlPrefix = '/';
        else
            this.urlPrefix = '/' + router_config_1.RouterConfig.api_prefix + '/';
        if (router_config_1.RouterConfig.api_version !== '' || router_config_1.RouterConfig.api_version !== null)
            this.urlPrefix += router_config_1.RouterConfig.api_version + '/';
    }
    get(url, callback, middleware) {
        if (typeof callback !== 'function')
            throw new Error('Callback must be a function.');
        this.app.get(this.urlPrefix + url, (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.verifyIp(req, res);
            if (middleware == undefined)
                return callback(req, res);
            if (middleware instanceof Array)
                this.checkMiddlewareArray(middleware, res, req).then(() => {
                    callback(req, res);
                });
            else
                this.middleware(middleware, res, req, () => callback(req, res));
        }));
    }
    post(url, callback, middleware) {
        if (typeof callback !== 'function')
            throw new Error('Callback must be a function.');
        this.app.post(this.urlPrefix + url, (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.verifyIp(req, res);
            if (middleware == undefined)
                return callback(req, res);
            if (middleware instanceof Array)
                this.checkMiddlewareArray(middleware, res, req).then(() => {
                    callback(req, res);
                });
            else
                this.middleware(middleware, res, req, () => callback(req, res));
        }));
    }
    put(url, callback, middleware) {
        if (typeof callback !== 'function')
            throw new Error('Callback must be a function.');
        this.app.put(this.urlPrefix + url, (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.verifyIp(req, res);
            if (middleware == undefined)
                return callback(req, res);
            if (middleware instanceof Array)
                this.checkMiddlewareArray(middleware, res, req).then(() => {
                    callback(req, res);
                });
            else
                this.middleware(middleware, res, req, () => callback(req, res));
        }));
    }
    delete(url, callback, middleware) {
        if (typeof callback !== 'function')
            throw new Error('Callback must be a function.');
        this.app.delete(this.urlPrefix + url, (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.verifyIp(req, res);
            if (middleware == undefined)
                return callback(req, res);
            if (middleware instanceof Array)
                this.checkMiddlewareArray(middleware, res, req).then(() => {
                    callback(req, res);
                });
            else
                this.middleware(middleware, res, req, () => callback(req, res));
        }));
    }
    checkMiddlewareArray(middleware, res, req) {
        return new Promise((resolve, reject) => {
            let passed = [];
            for (let i = 0; i < middleware.length; i++) {
                this.middleware(middleware[i], res, req, () => passed.push(true));
                if (i == middleware.length - 1 && passed.length == middleware.length - 1)
                    resolve();
            }
        });
    }
    middleware(controller, socket, request, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof callback !== 'function')
                throw new Error('Callback on middleware is not a function.');
            let res = yield new controller(request, socket).run();
            if (typeof res !== 'boolean')
                throw new Error('Middleware return value is not a boolean.');
            if (res == true)
                callback();
            else
                return;
        });
    }
    verifyIp(req, resp) {
        return new Promise((res, rej) => {
            if (router_config_1.RouterConfig.allowed_ips.length == 0) {
                this.logAccess(req);
                res(true);
            }
            for (let i = 0; i < router_config_1.RouterConfig.allowed_ips.length; i++) {
                if (router_config_1.RouterConfig.allowed_ips[i] == req.ip) {
                    this.logAccess(req);
                    res(true);
                }
                else {
                    return resp.send('Internal Error: ip_verif_fail. | IP \n\n' + req.ip + ' is not authorized to access this server.');
                }
            }
        });
    }
    logAccess(req) {
        if (router_config_1.RouterConfig.log_requests) {
            Logger_1.Logger.log(`${req.ip == '::1' ? '127.0.0.1' : req.ip} accessed ${req.url}`);
        }
    }
}
exports.Http = Http;
class RouteResponses {
}
RouteResponses.NotFound = (req) => {
    Logger_1.Logger.log(`${req.url} failed: 404 Not Found`);
    return `404: ${req.url} was not found on this server.`;
};
exports.RouteResponses = RouteResponses;
//# sourceMappingURL=http.js.map