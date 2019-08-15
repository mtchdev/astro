import { Environment } from 'vendor/astro/entities/environment';

/**
 * Environment Imports
 */
import { ProdEnvironment } from './prod.env';
import { DevEnvironment } from './dev.env';

export const ENVIRONMENTS: Array<Environment> = [
    ProdEnvironment,
    DevEnvironment
];
