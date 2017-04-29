'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./config')
const _ = require('./utils')

module.exports = {
  entry: {
    client: './common/index.jsx'
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
      actions: `${config.srcPath}/actions/`,
      api: `${config.srcPath}/api/`,
      reducers: `${config.srcPath}/reducers/`,
      components: `${config.srcPath}/components/`,
      containers: `${config.srcPath}/containers/`,
      routing: `${config.srcPath}/routing/`,
      styles: `${config.srcPath}/styles/`,
      scss_vars: `${config.srcPath}/styles/vars.scss`,
      config: `${config.srcPath}/config/` + process.env.REACT_WEBPACK_ENV
    },
    modules: [
      // places where to search for required modules
      _.cwd('common'),
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
      template: path.resolve(__dirname, '../common/index.html'),
      filename: _.outputIndexPath
    }),
    new webpack.DefinePlugin({
      'process.env.BUILD_DEMO': JSON.stringify(!!process.env.BUILD_DEMO)
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
