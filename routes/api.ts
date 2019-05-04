import { Route } from '../app/utils/router/route';
import { Http } from '../app/utils/router/http';

/**
 * Place your routes below. Example is provided using the Route provider
 */

import { UserController } from '../app/controllers/UserController';

new Route({
    controller: new UserController().getUsers(),
    url: 'users',
    method: 'GET',
});