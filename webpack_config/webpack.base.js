'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./config')
const _ = require('./utils')

module.exports = {
    entry: {
        client: './common/index.jsx'
    },
    output: {
        path: _.outputPath,
        filename: '[name].js',
        publicPath: config.publicPath
    },
    performance: {
        hints: process.env.NODE_ENV === 'production'
            ? 'warning'
            : false
    },
    resolve: {
        extensions: [
            '.js', '.jsx', '.css', '.json', '.scss'
        ],
        alias: {
            actions: `${config.srcPath}/actions/`,
            api: `${config.srcPath}/api/`,
            reducers: `${config.srcPath}/reducers/`,
            components: `${config.srcPath}/components/`,
            containers: `${config.srcPath}/containers/`,
            styles: `${config.srcPath}/styles/`,
            scss_vars: `${config.srcPath}/styles/vars.scss`,
            config: `${config.srcPath}/config/` + process.env.REACT_WEBPACK_ENV
        },
        modules: [
            // places where to search for required modules
            _.cwd('common'),
            _.cwd('node_modules'),
            _.cwd('./')
        ]
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: ['babel-loader'],
                exclude: [/node_modules/]
            }, {
                test: /\.(ico|jpg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file-loader?limit=100000'
                // query: {
                //   name: 'static/media/[name].[hash:8].[ext]'
                // }
            }, {
                test: /\.svg$/,
                loader: 'file-loader'
            }, {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader', 'resolve-url-loader']
            }, {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: config.title,
            template: path.resolve(__dirname, '../common/index.html'),
            filename: _.outputIndexPath
        }),
        new webpack.LoaderOptionsPlugin(_.loadersOptions()),
        new CopyWebpackPlugin([
            {
                from: _.cwd('./static'),
                // to the root of dist path
                to: './'
            }
        ])
    ],
    target: _.target
}
