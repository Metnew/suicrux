'use strict'
const pkg = require('../package')
const path = require('path')

module.exports = {
  port: 5433,
  title: 'reatty',
  publicPath: '/',
  srcPath: path.join(__dirname, './../common'),
  // add these dependencies to a standalone vendor bundle
  vendor: [
    'react', 'react-dom', 'react-router', 'redux', 'react-router-redux', 'redux-thunk', 'semantic-ui-react', 'whatwg-fetch'
  ],
  // enable babelrc
  babel: {
    babelrc: true
  },
  cssModules: false
}
