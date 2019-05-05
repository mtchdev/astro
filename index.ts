/**
 * Import primary server provider
 */

import * as express from 'express';
import * as bodyParser from 'body-parser';

/**
 * Import required helpers and utilities
 */

import { serve } from './app/utils/server/serve';
import { Instance } from './app/utils/services/instance';

/**
 * Initialize the application instance
 */

const APP = express();

/**
 * Serve the instance
 */

serve.up(APP);
Instance.app = APP;
APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Start router
 */

require('./routes/api');