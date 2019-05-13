import { Http } from 'vendor/astro/router/http';
const http = new Http();

/**
 * Place your routes below. Example is provided using the Route provider
 */

import { UserController } from '../app/controllers/UserController';
import { AuthMiddleware } from '../app/middleware/AuthMiddleware';

http.get('users', (req: Request, res: Response) => {
    new UserController(res).getUsers();
}, [AuthMiddleware]);

http.post('user', (req: Request, res: Response) => {
    new UserController(res).addUser(req);
});