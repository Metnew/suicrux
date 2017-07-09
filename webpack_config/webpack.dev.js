'use strict'
process.env.NODE_ENV = 'development'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const base = require('./webpack.base')
const FriendlyErrors = require('friendly-errors-webpack-plugin')

const config = require('./config')
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
      loaders.style,
      loaders.css,
      loaders.postcss,
      loaders.resolve,
      loaders.sass
    ]
  }
)

// add dev plugins
base.plugins.push(
  // add index.html
  new HtmlWebpackPlugin({
    title: config.title,
    template: path.resolve(config.srcCommonPath, 'index.html'),
    filename: path.resolve(config.distPath, 'index.html')
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new FriendlyErrors()
)

module.exports = base
