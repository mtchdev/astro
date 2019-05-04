import { Http } from '../app/utils/router/http';
const http = new Http();

/**
 * Place your routes below. Example is provided using the Route provider
 */

import { UserController } from '../app/controllers/UserController';
import { AuthMiddleware } from '../app/middleware/AuthMiddleware';

http.get('users', (req: any, res: any) => {
    new UserController(res).getUsers();
}, [AuthMiddleware]);
