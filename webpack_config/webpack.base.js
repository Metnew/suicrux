'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./config')
const _ = require('./utils')

module.exports = {
  entry: {
    client: path.join(__dirname, '../src/client/index.jsx')
  },
  output: {
    path: _.outputPath,
    filename: '[name].js',
    publicPath: config.publicPath
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json', '.scss'],
    alias: {
      actions: `${config.commonFolderPath}/actions/`,
      api: `${config.commonFolderPath}/api/`,
      reducers: `${config.commonFolderPath}/reducers/`,
      components: `${config.commonFolderPath}/components/`,
      containers: `${config.commonFolderPath}/containers/`,
      routing: `${config.commonFolderPath}/routing/`,
      styles: `${config.commonFolderPath}/styles/`,
      scss_vars: `${config.commonFolderPath}/styles/vars.scss`,
      config:
        `${config.commonFolderPath}/config/` + process.env.REACT_WEBPACK_ENV
    },
    modules: [
      // places where to search for required modules
      _.cwd('src/common'),
      _.cwd('src'),
      _.cwd('node_modules')
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
        test: /\.(ico|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
        use: 'file-loader?limit=100000'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?limit=100000',
          {
            loader: 'img-loader',
            options: {
              enabled: true,
              optipng: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // add index.html
    new HtmlWebpackPlugin({
      title: config.title,
      template: path.resolve(__dirname, '../src/common/index.html'),
      filename: _.outputIndexPath
    }),
    new webpack.DefinePlugin({
      'process.env.BUILD_DEMO': JSON.stringify(!!process.env.BUILD_DEMO),
      'process.env.BROWSER': true
    }),
    new CopyWebpackPlugin([
      {
        from: _.cwd('./static'),
        // to the root of the dist path
        to: './'
      }
    ])
  ],
  target: _.target
}
