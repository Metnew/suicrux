'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

let config = Object.assign({}, baseConfig, {
    entry: [
        'babel-polyfill',
        'webpack-dev-server/client?http://0.0.0.0:' + defaultSettings.port,
        'webpack/hot/dev-server',
        path.resolve(__dirname, './../common/index.jsx')
    ],
    cache: true,
    devtool: 'eval-source-map',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: defaultSettings.getDefaultModules(),
    watchOptions: {
        poll: true
    }
});

// Add needed loaders to the defaults here
config.module.loaders.push({
    test: /\.css$/,
    loader: 'style-loader!css-loader'
}, {
    test: /\.scss/,
    loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
}, {
    test: /\.(js|jsx)$/,
    loaders: [
        'react-hot-loader/webpack', 'babel-loader'
    ],

    include: [].concat(config.additionalPaths, path.resolve(__dirname, './../common'))
})

module.exports = config;
