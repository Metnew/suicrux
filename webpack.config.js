'use strict';

const path = require('path');
const args = require('minimist')(process.argv.slice(2));

// List of allowed environments
const allowedEnvs = ['dev', 'dist', 'test'];

// "start": "node webpack.server.js", - commented from package.json

// Set the correct environment
var env;
if (args._.length > 0 && args._.indexOf('start') !== -1) {
    env = 'test';
} else if (args.env) {
    env = args.env;
} else {
    env = 'dev';
}

process.env.REACT_WEBPACK_ENV = env


// Get available configurations
const configs = {
    base: require(path.join(__dirname, 'webpack_config/base')),
    dev: require(path.join(__dirname, 'webpack_config/dev')),
    dist: require(path.join(__dirname, 'webpack_config/dist')),
    test: require(path.join(__dirname, 'webpack_config/test'))
};

configs.prod = configs.dev;
configs.staging = configs.dev;

/**
 * Build the webpack configuration
 * @param  {String} wantedEnv The wanted environment
 * @return {Object} Webpack config
 */
function buildConfig(wantedEnv) {
    let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
    let validEnv = isValid
        ? wantedEnv
        : 'dev';
    return configs[validEnv];
}

module.exports = buildConfig(env);
