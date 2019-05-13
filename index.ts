/**
 * Import primary server provider
 */

import express from 'express';
import * as bodyParser from 'body-parser';

/**
 * Import required helpers and utilities
 */

import { serve } from 'vendor/astro/server/serve';
import { Instance } from 'vendor/astro/services/instance';

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