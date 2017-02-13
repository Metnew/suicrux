'use strict';
let path = require('path');
let defaultSettings = require('./defaults');
let additionalPaths = [];

module.exports = {
    context: path.resolve(__dirname, '../'),
    additionalPaths: additionalPaths,
    port: defaultSettings.port,
    debug: true,
    devtool: 'eval',
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'app.js',
        publicPath: defaultSettings.publicPath
    },
    devServer: {
        clientLogLevel: 'none',
        contentBase: path.join(__dirname, '../common'),
        historyApiFallback: true,
        proxy: {
            '/api/v1': {
                secure:false,
                changeOrigin: true,
                ignorePath:true,
                target: 'http://localhost:3333/api/v1'
            }
        },
        compress: true,
        hot: true,
        port: defaultSettings.port,
        publicPath: defaultSettings.publicPath,
        noInfo: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    },
    resolve: {
        extensions: [
            '', '.js', '.jsx'
        ],
        alias: {
            actions: `${defaultSettings.srcPath}/actions/`,
            api: `${defaultSettings.srcPath}/api/`,
            reducers: `${defaultSettings.srcPath}/reducers/`,
            components: `${defaultSettings.srcPath}/components/`,
            containers: `${defaultSettings.srcPath}/containers/`,
            styles: `${defaultSettings.srcPath}/styles/`,
            scss_vars: `${defaultSettings.srcPath}/styles/vars.scss`,
            config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV
        }
    },
    module: {},
    postcss: function() {
        return [];
    }
};
