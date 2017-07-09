'use strict'
const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const languages = require('../i18n')
const config = require('./config')

process.env.BASE_API = process.env.BASE_API || 'http://localhost:4000/api/v1'

let definePluginArgs = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.BASE_API': JSON.stringify(process.env.BASE_API),
  'process.env.BUILD_DEMO': JSON.stringify(process.env.BUILD_DEMO)
}

if (process.env.NODE_ENV === 'development') {
  // XXX: don't use i18n plugin in development
  definePluginArgs['i18n'] = ''
}

module.exports = {
  entry: {
    client: path.join(config.srcPath, '/client')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash:6].js',
    publicPath: config.publicPath
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json', '.scss'],
    alias: {
      common: `${config.srcCommonPath}`,
      actions: `${config.srcCommonPath}/actions/`,
      api: `${config.srcCommonPath}/api/`,
      components: `${config.srcCommonPath}/components/`,
      containers: `${config.srcCommonPath}/containers/`,
      reducers: `${config.srcCommonPath}/reducers/`,
      routing: `${config.srcCommonPath}/routing/`,
      styles: `${config.srcCommonPath}/styles/`
    },
    modules: [
      // places where to search for required modules
      config.srcPath,
      path.join(__dirname, '../node_modules')
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
        use: `file-loader?limit=100000&name=assets/[name].[hash].[ext]`
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          `file-loader?limit=100000&name=assets/[name].[hash].[ext]`
          // NOTE: it looks like there is an issue using img-loader in some environments
          // {
          // 	loader: 'img-loader',
          // 	options: {
          // 		enabled: true,
          // 		optipng: true
          // 	}
          // }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(definePluginArgs),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../static'),
        // Fix path for demo
        to: './'
      }
    ])
  ],
  target: 'web'
}
