"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Middleware_1 = require("vendor/astro/http/Middleware");
class AuthMiddleware extends Middleware_1.Middleware {
    constructor(request, data) {
        super(data);
        this.request = request;
    }
    run() {
        return this.next();
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map