process.env.NODE_ENV = 'production'

const exec = require('child_process').execSync
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SriPlugin = require('webpack-subresource-integrity')
const I18nPlugin = require('i18n-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const BabiliPlugin = require('babili-webpack-plugin')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const OfflinePlugin = require('offline-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ShakePlugin = require('webpack-common-shake').Plugin
// const git = require('git-rev-sync')
// const _ = require('lodash')
const path = require('path')
// NOTE: WebpackShellPlugin allows you to run custom shell commands before and after build
// const WebpackShellPlugin = require('webpack-shell-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const {APP_LANGUAGE, ANALYZE_BUNDLE} = process.env
let base = require('./webpack.base')
const config = require('../config')
let languages = config.i18n
const languageName = APP_LANGUAGE || 'en'

exec('rm -rf dist/client')
// NOTE: you can track versions with gitHash and store your build
// in dist folder with path like: /dist/<gitHash>/{yourFilesHere}
// const gitHash = git.short() //

// use hash filename to support long-term caching
base.output.filename = '[name].[chunkhash:8].js'
base.output.path = path.join(base.output.path, languageName)
base.output.crossOriginLoading = 'anonymous'
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
try {
  const langText = languages[languageName]
  languages = {[languageName]: langText}
} catch (e) {
  throw new Error(
    `Something went wrong with your i18n. Check that "${APP_LANGUAGE}" property exists in i18n object. ${e}`
  )
}

// add webpack plugins
base.plugins.push(
  new ProgressPlugin(),
  new ExtractTextPlugin({
    filename: '[name].[chunkhash:8].css',
    allChunks: true
  }),
  new OptimizeCssAssetsPlugin({
    cssProcessorOptions: {
      safe: true,
      discardComments: {
        removeAll: true
      }
    }
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new ShakePlugin(),
  // NOTE: you can use BabiliPlugin as an alternative to UglifyJSPlugin
  // new BabiliPlugin(),
  new UglifyJSPlugin({
    sourceMap: true,
    compress: {
      warnings: false,
      drop_console: true
    },
    output: {
      comments: false
    }
  }),
  // NOTE: Prepack is currently in alpha, be carefull with it
  // new PrepackWebpackPlugin(),
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
    banner: config.banner
  }),
  // NOTE: this plugin looks cool, but there are few big issues:
  // 1. It sets invalid url to browserconfig.xml and manifest.json in index.html.
  // E.g: in generated index.html you can see:
  // <meta name="msapplication-config" content="browserconfig.xml">
  // 2. It looks like generated images aren't minified.(not sure)
  // 3. plugin is deprecated (at least look like it's deprecated)!
  // NOTE: It would be better to generate favicons without this plugin.
  new FaviconsWebpackPlugin({
    // add theme-color property
    background: config.manifest.theme,
    prefix: `favicons/`,
    logo: path.resolve(config.rootPath, './static/images/logo.png'),
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
  //
  // create manifest.json
  new ManifestPlugin({fileName: 'manifest.json', cache: config.manifest}),
  // generate <link rel="preload"> tags for async chunks
  new PreloadWebpackPlugin({
    rel: 'preload',
    as: 'script',
    include: 'asyncChunks'
  }),
  // https://caniuse.com/#feat=subresource-integrity
  // NOTE: please, read about SRI before using it!
  new SriPlugin({
    hashFuncNames: ['sha256', 'sha384'],
    enabled: true
  }),
  new CompressionPlugin({
    algorithm: 'gzip'
  }),
  new I18nPlugin(languages[languageName], {functionName: 'i18n'}),
  new HtmlWebpackPlugin({
    title: config.title,
    language: languageName,
    theme_color: config.manifest.theme_color,
    // minify: true,
    template: path.resolve(config.srcCommonPath, 'index.ejs'),
    filename: path.resolve(base.output.path, 'index.html'),
    chunksSortMode: 'dependency'
  }),
  new OfflinePlugin({
    // responseStrategy: 'network-first',
    // safeToUseOptionalCaches: false,
    // caches: {
    //   main: ['vendor.*.css', 'vendor.*.js']
    // },
    // excludes: ['.htaccess'],
    AppCache: false,
    // ServiceWorker: {
    //   navigateFallbackURL: '/?offline=true',
    //   events: true
    // }
  })
)

// minimize webpack output
base.stats = {
  colors: true,
  // Add children information
  children: false,
  // Add chunk information (setting this to `false` allows for a less verbose output)
  chunks: false,
  // Add built modules information to chunk information
  chunkModules: false,
  chunkOrigins: false,
  modules: false,
  reasons: true,
  errorDetails: true
}

// const build = Object.keys(languages).map(language => {
//   let baseConfigForLang = _.cloneDeep(base)
//   baseConfigForLang.output.path = path.join(
//     baseConfigForLang.output.path,
//     language
//   )
//
//   baseConfigForLang.plugins.push(
//     new I18nPlugin(languages[language], {functionName: 'i18n'}),
// new HtmlWebpackPlugin({
//   title: config.title,
//   language,
//   // minify: true,
//   template: path.resolve(config.srcCommonPath, 'index.ejs'),
//   filename: path.resolve(baseConfigForLang.output.path, 'index.html'),
//   chunksSortMode: 'dependency'
// })
//   )
//   return baseConfigForLang
// })

module.exports = base
