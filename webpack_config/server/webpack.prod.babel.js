'use strict'
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ShakePlugin = require('webpack-common-shake').Plugin

const plugins = [
  new webpack.ProgressPlugin(),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new ShakePlugin(),
  // NOTE: you can use BabiliPlugin as an alternative to UglifyJSPlugin
  // new BabiliPlugin(),
  new UglifyJSPlugin({
    sourceMap: true,
    compress: {
      warnings: false
      // This option removes console log in production
      // drop_console: true
    },
    output: {
      comments: false
    }
  }),
  new webpack.NormalModuleReplacementPlugin(
    /\.(css|sass|less|jpg|png|gif|scss)$/,
    'node-noop'
  )
  // new webpack.IgnorePlugin(/\.(css|sass|less|jpg|png|gif|scss)$/)
]

module.exports = Object.assign({}, baseWebpackConfig, {
  devtool: 'cheap-source-map',
  plugins: baseWebpackConfig.plugins.concat(plugins)
})
