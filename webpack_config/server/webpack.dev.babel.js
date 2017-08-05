'use strict'
const path = require('path')
// const fs = require('fs')
const webpack = require('webpack')
const _ = require('lodash')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base')
const WebpackShellPlugin = require('webpack-shell-plugin')
const FriendlyErrors = require('friendly-errors-webpack-plugin')

const plugins = [
  new WebpackShellPlugin({
    onBuildEnd: [`nodemon ${path.join(config.distPath, '/server')}`]
  }),
  // new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new FriendlyErrors()
]

const build = Object.assign({}, baseWebpackConfig, {
  // entry: config.entry.concat(['webpack/hot/poll?1000']),
  devtool: 'eval-source-map',
  watch: true,
  plugins: baseWebpackConfig.plugins.concat(plugins)
})

module.exports = build
