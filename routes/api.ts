import { Http } from 'vendor/astro/router/http';
const http = new Http();

/**
 * Place your routes below. Example is provided using the Route provider
 */

import { UserController } from '../app/controllers/UserController';
import { AuthMiddleware } from '../app/middleware/AuthMiddleware';

http.get('users', (req: any, res: any) => new UserController(res).getUsers(), [AuthMiddleware]);
http.get('user/:username', (req: any, res: any) => new UserController(res).getUser(req));

http.put('user/username', (req: any, res: any) => new UserController(res).changeUsername(req));

http.post('user', (req: any, res: any) => new UserController(res).addUser(req));