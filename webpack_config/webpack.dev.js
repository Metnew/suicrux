'use strict'
process.env.NODE_ENV = 'development'
process.env.REACT_WEBPACK_ENV = 'dev'

const webpack = require('webpack')
const base = require('./webpack.base')
const FriendlyErrors = require('friendly-errors-webpack-plugin')
const loaders = {
  style: {loader: 'style-loader'},
  css: {loader: 'css-loader', options: {sourceMap: true}},
  resolve: 'resolve-url-loader',
  postcss: {
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    }
  },
  sass: {loader: 'sass-loader', options: {sourceMap: true}}
}

base.devtool = 'eval-source-map'
base.module.rules.push(
  {
    test: /\.css$/,
    loaders: [loaders.style, loaders.css, loaders.postcss, loaders.resolve]
  },
  {
    test: /\.scss$/,
    loaders: [
      loaders.style, loaders.css, loaders.postcss, loaders.resolve, loaders.sass
    ]
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
