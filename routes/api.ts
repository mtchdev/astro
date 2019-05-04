import { Http } from '../app/utils/router/http';

/**
 * Place your routes below. Example is provided using the Route provider
 */

import { UserController } from '../app/controllers/UserController';

new Http().get('users', (req: any, res: any) => {
    new UserController(res).getUsers();
});