import { Http, RouteResponses } from 'vendor/astro/router/http';
const http = new Http();

/**
 * Place your routes below. Example is provided using the Route provider
 */

import { UserController } from 'app/controllers/UserController';
import { AuthMiddleware } from 'app/middleware/AuthMiddleware';

http.get('users', (req: any, res: any) => new UserController(res).getUsers());
http.get('user/:username', (req: any, res: any) => new UserController(res).getUser(req));

http.get('*', (req: any, res: any) => {
    res.status(404).send(RouteResponses.NotFound(req));
});
