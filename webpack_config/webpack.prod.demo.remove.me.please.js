process.env.NODE_ENV = 'production'
const exec = require('child_process').execSync
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SriPlugin = require('webpack-subresource-integrity')
const I18nPlugin = require('i18n-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const OfflinePlugin = require('offline-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
// const git = require('git-rev-sync')
let languages = require('../i18n')
const _ = require('lodash')
const path = require('path')
// NOTE: WebpackShellPlugin allows you to run custom shell commands before and after build
// const WebpackShellPlugin = require('webpack-shell-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const {APP_LANGUAGE, ANALYZE_BUNDLE} = process.env
let base = require('./webpack.base')
const config = require('./config')

exec('rm -rf dist/')
// NOTE: you can track versions with gitHash and store your build
// in dist folder with path like: /dist/<gitHash>/{yourFilesHere}
// const gitHash = git.short() //

// use hash filename to support long-term caching
base.output.filename = '[name].[chunkhash:8].js'
base.output.publicPath = 'https://metnew.github.io/react-semantic.ui-starter/'
base.devtool = 'cheap-source-map'
base.module.rules.push(
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'postcss-loader']
    })
  },
  {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'postcss-loader', 'sass-loader']
    })
  }
)

// Do you want to use bundle analyzer?
if (ANALYZE_BUNDLE) {
  base.plugins.push(new BundleAnalyzerPlugin())
}

// NOTE: if language was set, then build only this language
if (APP_LANGUAGE) {
  try {
    const langText = languages[APP_LANGUAGE]
    languages = {[APP_LANGUAGE]: langText}
  } catch (e) {
    throw new Error(
      `Something went wrong with your i18n. Check that "${APP_LANGUAGE}" property exists in i18n object. ${e}`
    )
  }
}

// add webpack plugins
base.plugins.push(
  new ProgressPlugin(),
  new ExtractTextPlugin({
    filename: '[name].[chunkhash:8].css',
    allChunks: true
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new OptimizeCssAssetsPlugin(),
  // NOTE: Prepack currently in alpha, be carefull with it
  // new PrepackWebpackPlugin(),
  //
  // extract vendor chunks
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module => {
      // this assumes your vendor imports exist in the node_modules directory
      return module.context && module.context.indexOf('node_modules') !== -1
    }
  }),
  // extract lazy containers chunk
  new webpack.optimize.CommonsChunkPlugin({
    name: 'lazy-containers',
    chunks: ['lazy-containers'],
    async: true
  }),
  // manifest chunk, more info in webpack docs
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
  }),
  new webpack.BannerPlugin({
    banner:
      'hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]'
  }),
  // XXX: this plugin is cool, but there is a one big issue:
  // It sets invalid url to browserconfig.xml and manifest.json in index.html.
  // E.g: in generated index.html you can see:
  // <meta name="msapplication-config" content="browserconfig.xml">
  new FaviconsWebpackPlugin({
    // add theme-color property
    background: config.manifest.theme,
    prefix: 'icons/',
    logo: path.resolve(__dirname, '../static/images/logo.png'),
    title: config.title,
    // Inject the html into the html-webpack-plugin
    inject: true,
    // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      coast: false,
      favicons: true,
      firefox: true,
      opengraph: false,
      twitter: true,
      yandex: false,
      windows: true
    }
  }),
  new BabiliPlugin(),
  // XXX: https://github.com/webpack-contrib/uglifyjs-webpack-plugin
  // XXX: uglify-js 3.* doesn't working with es6 currently!
  // new UglifyJsPlugin({
  // 	sourceMap: true,
  // 	compress: {
  // 		warnings: false
  // 	},
  // 	output: {
  // 		comments: false
  // 	}
  // }),
  //
  //
  // NOTE: you can uncomment this option.
  // I think it's unnecessary for small app, because it slows page finish loading.
  // new PreloadWebpackPlugin({
  // 	rel: 'preload',
  // 	as: 'script',
  // 	include: 'asyncChunks'
  // }),
  //
  //
  // create manifest.json
  new ManifestPlugin({fileName: 'manifest.json', cache: config.manifest}),
  //
  // AppCache + ServiceWorkers
  new OfflinePlugin({
    safeToUseOptionalCaches: true,
    caches: {
      main: ['vendor.*.css', 'vendor.*.js'],
      additional: [':externals:'],
      optional: [':rest:']
    },
    // excludes: ['.htaccess'],
    AppCache: false,
    ServiceWorker: {
      navigateFallbackURL: '/',
      events: true
    }
  }),
  new CompressionPlugin({
    algorithm: 'gzip'
  })
  // https://caniuse.com/#feat=subresource-integrity
  // NOTE: please, read about SRI before using it!
  // new SriPlugin({
  // 	hashFuncNames: ['sha256', 'sha384'],
  // 	enabled: process.env.NODE_ENV === 'production'
  // })
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

const builds = Object.keys(languages).map(language => {
  let baseConfigForLang = _.cloneDeep(base)
  baseConfigForLang.output.path = path.join(
    baseConfigForLang.output.path,
    language
  )
  const indexHtmlName = 'index.remove.me.please.html'
  baseConfigForLang.plugins.push(
    new I18nPlugin(languages[language], {functionName: 'i18n'}),
    new HtmlWebpackPlugin({
      title: config.title,
      language: language,
      build_demo: process.env.BUILD_DEMO,
      // minify: true,
      template: path.resolve(config.srcCommonPath, indexHtmlName),
      filename: path.resolve(baseConfigForLang.output.path, 'index.html'),
      chunksSortMode: 'dependency'
    })
  )
  return baseConfigForLang
})

module.exports = builds
