/**
 * Import primary server provider
 */

import express from 'express';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';

/**
 * Import required helpers and types
 */

require('dotenv').config();
import { serve } from 'vendor/astro/server/serve';
import { Instance } from 'vendor/astro/services/instance';
import { createInstance } from 'vendor/astro/services/mysql';
import { Express } from 'express';

/**
 * Initialize the application instance
 */

const APP: Express = express();

/**
 * Serve the instance
 */

serve.up(APP);
Instance.app = APP;
APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({
    extended: true
}));
APP.use(helmet());

createInstance();

/**
 * Start router
 */

require('./routes/api');
