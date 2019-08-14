/**
 * Licensed to bisonfoutu
 * Obtained from https://github.com/bisonfoutu/nest-tsconfig-paths-example
 */

const tsConfig = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

const baseUrl = './build'; // Either absolute or relative path. If relative it's resolved to current working directory.
tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
});
