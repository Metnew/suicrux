'use strict'
process.env.NODE_ENV = 'development'
process.env.REACT_WEBPACK_ENV = 'dev'

const webpack = require('webpack')
const base = require('./webpack.base')
const FriendlyErrors = require('friendly-errors-webpack-plugin')

base.devtool = 'eval-source-map'
base.module.rules.push(
  {
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader', 'resolve-url-loader']
  },
  {
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader']
  }
)

// add dev plugins
base.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new FriendlyErrors()
)

module.exports = base
