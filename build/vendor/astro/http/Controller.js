"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = require("../util/Response");
const State_1 = require("../util/State");
const typeorm_1 = require("typeorm");
class Controller {
    constructor(socket) {
        this.db = typeorm_1.getManager();
        this.state = State_1.state.internal;
        this.responseHandler = new Response_1.Response(socket);
    }
    respondWithSuccess(message) {
        if (typeof message === 'string') {
            this.responseHandler.success({ message: message });
        }
        else if (typeof message === 'number') {
            this.responseHandler.success({ status: message });
        }
        else {
            this.responseHandler.success({ data: message, message: 'success' });
        }
    }
    respondWithError(state, code) {
        if (state && code) {
            this.responseHandler.error({ message: state.toString(), status: code });
        }
        else if (state && typeof state === 'string') {
            this.responseHandler.error({ message: state });
        }
        else if (state && typeof state === 'number') {
            this.responseHandler.error({ status: state });
        }
    }
    setState(newObj) {
        this.state = Object.assign({}, this.state, { newObj });
        State_1.state.internal = newObj;
        return this.state;
    }
}
exports.Controller = Controller;
//# sourceMappingURL=Controller.js.map