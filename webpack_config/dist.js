'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// just for lodash build size
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = Object.assign({}, baseConfig, {
    entry: [
        path.resolve(__dirname, './../common/index')
    ],
    // output: {
    //     path: path.join(__dirname, '../dist'),
    //     filename: 'app.js',
    //     publicPath: defaultSettings.publicPath
    // },
    cache: false,
    devtool: 'eval-source-map',
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
        new LodashModuleReplacementPlugin,
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('styles.css')
    ],
    module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
    test: /\.scss/,
    loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'sass-loader?outputStyle=expanded'})
}, {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader'})
}, {
    test: /\.(js|jsx)$/,
    loader: 'babel',
    include: [].concat(config.additionalPaths, path.resolve(__dirname, './../common'))
});

module.exports = config;
