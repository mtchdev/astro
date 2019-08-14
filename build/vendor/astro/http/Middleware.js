"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = require("../util/Response");
class Middleware {
    constructor(socket) {
        this.socket = socket;
        this.responseHandler = new Response_1.Response(socket);
    }
    next() {
        return true;
    }
    exit() {
        this.responseHandler.error({
            message: '403: Denied',
            status: 403,
            data: { error: 'middleware_fail' }
        });
        return false;
    }
}
exports.Middleware = Middleware;
//# sourceMappingURL=Middleware.js.map