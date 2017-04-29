'use strict'
process.env.NODE_ENV = 'production'
process.env.REACT_WEBPACK_ENV = 'dist'

const exec = require('child_process').execSync
const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const OfflinePlugin = require('offline-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const base = require('./webpack.base')
const config = require('./config')

exec('rm -rf dist/')
base.devtool = 'cheap-source-map'
base.module.rules.push(
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader'
    })
  },
  {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'sass-loader']
    })
  }
)

// a white list to add dependencies to vendor chunk
base.entry.vendor = config.vendor
// use hash filename to support long-term caching
base.output.filename = '[name].[chunkhash:8].js'

// add webpack plugins
base.plugins.push(
  new ProgressPlugin(),
  new ExtractTextPlugin('[name].[chunkhash:8].css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  // remove unused css
  new PurifyCSSPlugin({
    // Give paths to parse for rules. These should be absolute!
    moduleExtensions: ['.jsx', '.html', '.js'],
    paths: glob.sync(
      path.join(__dirname, 'common/*.jsx'),
      path.join(__dirname, 'common/components/**/*.jsx'),
      path.join(__dirname, 'common/containers/**/*.jsx'),
      path.join(__dirname, 'common/containers/**/*.jsx'),
      path.join(__dirname, 'node_modules/semantic-ui-react/dist/**/*.js')
    )
  }),
  new OptimizeCssAssetsPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  }),
  // extract vendor chunks
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.[chunkhash:8].js'
  }),
  new PreloadWebpackPlugin({rel: 'preload', as: 'script', include: 'all'}),
  // For progressive web apps
  // create manifest
  new ManifestPlugin({fileName: 'manifest.json', cache: config.manifest}),
  // AppCache + ServiceWorkers
  new OfflinePlugin({
    safeToUseOptionalCaches: true,
    caches: {
      main: ['vendor.*.css', 'vendor.*.js'],
      additional: [':externals:'],
      optional: [':rest:']
    },
    excludes: ['.htaccess'],
    AppCache: false,
    ServiceWorker: {
      navigateFallbackURL: '/',
      events: true
    }
  })
)
// minimize webpack output
base.stats = {
  // Add children information
  children: false,
  // Add chunk information (setting this to `false` allows for a less verbose output)
  chunks: false,
  // Add built modules information to chunk information
  chunkModules: false,
  chunkOrigins: false,
  modules: false
}

module.exports = base
