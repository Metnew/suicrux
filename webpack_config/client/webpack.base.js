'use strict'
const path = require('path')
const webpack = require('webpack')
const config = require('../config')

const {BASE_API, NODE_ENV, GA_ID, SENTRY_PUBLIC_DSN} = process.env

let definePluginArgs = {
  'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
  'process.env.BASE_API': JSON.stringify(BASE_API || '/api/v1'),
  'process.env.GA_ID': JSON.stringify(GA_ID),
  'process.env.SENTRY_PUBLIC_DSN': JSON.stringify(SENTRY_PUBLIC_DSN),
  'process.env.BROWSER': JSON.stringify(true)
}

if (process.env.NODE_ENV === 'development') {
  // ignore i18n plugin in development
  definePluginArgs['i18n'] = str => {
    return str
  }
}

module.exports = {
  entry: {
    client: path.join(config.srcPath, './client')
  },
  output: {
    path: path.join(config.distPath, './client'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash:6].js',
    publicPath: config.publicPath
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json', '.scss'],
    alias: config.alias,
    modules: [
      // places where to search for required modules
      config.srcPath,
      `${config.rootPath}/node_modules`
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              fix: true
            }
          }
        ],
        exclude: [/node_modules/]
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.(ico|eot|otf|webp|ttf|woff|woff2)$/i,
        use: `file-loader?limit=100000&name=assets/[name].[hash:8].[ext]`
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              // path: '/images',
              name: 'images/[name].[hash:8].[ext]'
            }
          },
          'img-loader'
        ]
      }
      // NOTE: LQIP loader doesn't work with file-loader and url-loader :(
      // `npm i --save-dev lqip-loader`
      // {
      //   test: /\.(jpe?g|png)$/i,
      //   enforce: 'pre',
      //   loaders: [
      //     {
      //       loader: 'lqip-loader',
      //       options: {
      //         path: '/images-lqip', // your image going to be in media folder in the output dir
      //         name: '[name]-lqip.[hash:8].[ext]' // you can use [hash].[ext] too if you wish
      //       }
      //     }
      //   ]
      // }
    ]
  },
  plugins: [new webpack.DefinePlugin(definePluginArgs)],
  target: 'web'
}
