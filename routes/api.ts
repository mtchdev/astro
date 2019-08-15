import { Http, RouteResponses } from 'vendor/astro/router/http';
import { Response, Request } from 'express';
const http = new Http();

/**
 * Place your routes below. Example is provided using the Route provider
 */

import { UserController } from 'app/controllers/UserController';
import { AuthMiddleware } from 'app/middleware/AuthMiddleware';

http.get('users', (req: Request, res: Response) => new UserController(res).getUsers(), AuthMiddleware);
http.get('user/:username', (req: Request, res: Response) => new UserController(res).getUser(req));

http.get('*', (req: Request, res: any) => {
    res.status(404).send(RouteResponses.NotFound(req));
});
