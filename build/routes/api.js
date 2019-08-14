"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("vendor/astro/router/http");
const http = new http_1.Http();
const UserController_1 = require("app/controllers/UserController");
http.get('users', (req, res) => new UserController_1.UserController(res).getUsers());
http.get('user/:username', (req, res) => new UserController_1.UserController(res).getUser(req));
http.get('*', (req, res) => {
    res.status(404).send(http_1.RouteResponses.NotFound(req));
});
//# sourceMappingURL=api.js.map