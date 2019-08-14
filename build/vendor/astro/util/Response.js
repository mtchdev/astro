"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
class Response {
    constructor(sender) {
        this.sender = sender;
    }
    success(message) {
        if (!message)
            message = {
                status: null,
                message: null,
                data: null
            };
        if (!message.message)
            message.message = 'success';
        if (!message.status)
            message.status = 200;
        this.response = Object.assign({}, message);
        return this.sender.send(this.response);
    }
    error(message) {
        if (!message)
            message = {
                status: null,
                message: null,
                data: null
            };
        if (!message.message)
            message.message = 'error';
        if (!message.status)
            message.status = 500;
        this.response = Object.assign({}, message);
        return this.sender.send(this.response);
    }
    json(message) {
        return this.sender.send(message);
    }
}
exports.Response = Response;
//# sourceMappingURL=Response.js.map