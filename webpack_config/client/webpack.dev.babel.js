'use strict'
process.env.NODE_ENV = 'development'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base')
const FriendlyErrors = require('friendly-errors-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const config = require('../config')

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

baseWebpackConfig.devtool = 'eval-source-map'
baseWebpackConfig.module.rules.push(
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
baseWebpackConfig.plugins.push(
  // add index.html
  new HtmlWebpackPlugin({
    title: config.title,
    template: path.resolve(config.srcCommonPath, 'index.ejs')
  }),
  // create manifest.json
  new ManifestPlugin({fileName: 'manifest.json', cache: config.manifest}),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new FriendlyErrors()
)

module.exports = baseWebpackConfig
