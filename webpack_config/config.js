/**
 * @file for config stuff that's used for webpack configuration, but isn't passed to webpack compiler
 */

const path = require('path')
const rootPath = path.join(__dirname, '../') // = "/"
const distPath = path.join(rootPath, './dist') // = "/dist"
const srcPath = path.join(rootPath, './src') // = "/src"
const srcCommonPath = path.join(srcPath, './common') // = "/src/common"
const i18n = require('../i18n')
module.exports = {
  port: process.env.PORT || 3000,
  title: 'React-Semantic.UI-Starter',
  publicPath: '/',
  i18n,
  // It's better to define pathes in one file
  // and then use everywhere across app
  srcPath,
  srcCommonPath,
  distPath,
  rootPath,
  // base places where server and client both search for modules
  modules: [],
  // aliases that both server and client use
  alias: {
    actions: `${srcCommonPath}/actions/`,
    api: `${srcCommonPath}/api/`,
    components: `${srcCommonPath}/components/`,
    containers: `${srcCommonPath}/containers/`,
    reducers: `${srcCommonPath}/reducers/`,
    routing: `${srcCommonPath}/routing/`,
    styles: `${srcCommonPath}/styles/`,
    static: `${rootPath}/static`,
    images: `${rootPath}/static/images`
  },
  // text for WebpackBannerPlugin,
  // this plugin just adds text banner to the beginning of your file
  banner:
  'MIT License. Copyright (c) 2017 Vladimir Metnew All Rights Reserved. Repo: https://github.com/Metnew/react-semantic.ui-starter',
  // your manifest.json
  manifest: {
    name: 'React-Semantic.UI-Starter',
    short_name: 'RSUIS',
    description: 'https://github.com/Metnew/react-semantic.ui-starter',
    icons: [
      {
        src: 'favicons/android-chrome-36x36.png',
        sizes: '36x36',
        type: 'image/png'
      },
      {
        src: 'favicons/android-chrome-48x48.png',
        sizes: '48x48',
        type: 'image/png'
      },
      {
        src: 'favicons/android-chrome-72x72.png',
        sizes: '72x72',
        type: 'image/png'
      },
      {
        src: 'favicons/android-chrome-96x96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: 'favicons/android-chrome-144x144.png',
        sizes: '144x144',
        type: 'image/png'
      },
      {
        src: 'favicons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'favicons/android-chrome-256x256.png',
        sizes: '256x256',
        type: 'image/png'
      },
      {
        src: 'favicons/android-chrome-384x384.png',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: 'favicons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    start_url: '.',
    display: 'standalone',
    background_color: '#f7f7f7',
    theme_color: '#009688'
  }
}
