'use strict'
const pkg = require('../package')
const path = require('path')

module.exports = {
  port: 3000,
  title: 'reatty',
  publicPath:  process.env.BUILD_GH_PAGES ? '/reatty' : '/',
  srcPath: path.join(__dirname, './../common'),
  // add these dependencies to a standalone vendor bundle
  vendor: [
    'react', 'react-dom', 'react-router', 'redux', 'react-router-redux', 'redux-thunk', 'semantic-ui-react', 'whatwg-fetch', 'semantic-ui-css/semantic.css'
  ],
  // enable babelrc
  babel: {
    babelrc: true
  },
  cssModules: false
}
