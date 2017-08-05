'use strict'
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const config = require('../config')
const exec = require('child_process').execSync

exec(`rm -rf ${config.distPath}/server`)

const {
  BASE_API,
  SENTRY_DSN,
  SENTRY_PUBLIC_DSN,
  NODE_ENV,
  DIST_PATH,
  APP_LANGUAGE,
  JWT_SECRET,
  PORT
} = process.env

const language = APP_LANGUAGE || 'en'

const definePluginArgs = {
  'process.env.BROWSER': JSON.stringify(false),
  'process.env.PORT': JSON.stringify(PORT || 4000),
  'process.env.JWT_SECRET': JSON.stringify(JWT_SECRET || 'secret'),
  'process.env.APP_LANGUAGE': JSON.stringify(language),
  'process.env.NODE_ENV': JSON.stringify(NODE_ENV || 'development'),
  'process.env.BASE_API': JSON.stringify(BASE_API || '/api/v1'),
  'process.env.SENTRY_PUBLIC_DSN': JSON.stringify(SENTRY_PUBLIC_DSN),
  'process.env.SENTRY_DSN': JSON.stringify(SENTRY_DSN),
  'process.env.DIST_PATH': JSON.stringify(
    DIST_PATH || path.join(config.distPath, './client', language)
  )
}

let nodeModules = {}
fs
  .readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  entry: [path.join(config.srcPath, './server/index')],
  target: 'node',
  output: {
    path: path.join(config.distPath, './server'),
    filename: 'index.js'
  },
  externals: nodeModules,
  performance: {
    hints: false
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: config.alias,
    modules: [
      // places where to search for required modules
      config.srcPath,
      path.join(config.rootPath, './node_modules')
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
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(definePluginArgs),
    new webpack.BannerPlugin({
      banner: config.banner
    }),
    // NOTE: Server can't process your styles/images/fonts on server-side rendering
    new webpack.NormalModuleReplacementPlugin(
      /\.(css|sass|less|jpg|png|gif|scss)$/,
      'node-noop'
    )
    // NOTE: @Metnew: If I remember correctly this plugin works similarly to NormalModuleReplacementPlugin
    // new webpack.IgnorePlugin(/\.(css|sass|less|jpg|png|gif|scss)$/)
  ],
  node: {
    __dirname: true,
    global: true
  }
}
