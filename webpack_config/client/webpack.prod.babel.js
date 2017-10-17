import webpack from 'webpack'
import rimraf from 'rimraf'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import SriPlugin from 'webpack-subresource-integrity'
import CompressionPlugin from 'compression-webpack-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
// import BabiliPlugin = require('babili-webpack-plugin'
import ProgressPlugin from 'webpack/lib/ProgressPlugin'
import OfflinePlugin from 'offline-plugin'
import PreloadWebpackPlugin from 'preload-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import {Plugin as ShakePlugin} from 'webpack-common-shake'
// import git from 'git-rev-sync')
// import _ from 'lodash')
import path from 'path'
// NOTE: WebpackShellPlugin allows you to run custom shell commands before and after build
// import WebpackShellPlugin from 'webpack-shell-plugin')
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import base from './webpack.base'
import config from '../config'
//
const {APP_LANGUAGE, ANALYZE_BUNDLE} = config

rimraf(`${config.distPath}/server/${APP_LANGUAGE}`, {}, () => {})
// NOTE: you can track versions with gitHash and store your build
// in dist folder with path like: /dist/client/<gitHash>/<languageName>/{yourFilesHere}
// const gitHash = git.short() //

// Do you want to use bundle analyzer?
if (ANALYZE_BUNDLE) {
	base.plugins.push(new BundleAnalyzerPlugin({analyzerMode: 'static'}))
}

base.devtool = 'cheap-source-map'
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

// use hash filename to support long-term caching
base.output.filename = '[name].[chunkhash:8].js'
base.output.crossOriginLoading = 'anonymous'

base.module.rules.push({
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
})

// Production plugins
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
	new HtmlWebpackPlugin({
		title: config.title,
		language: APP_LANGUAGE,
		theme_color: config.manifest.theme_color,
		// minify: true,
		template: path.resolve(config.rootPath, 'webpack_config', 'assets', 'index.ejs'),
		filename: path.resolve(base.output.path, 'index.html'),
		chunksSortMode: 'dependency'
	}),
	new OfflinePlugin({
		caches: {
			main: [
				'vendor.*.js',
				'vendor.*.css',
				'manifest.*.js',
				'client.*.js',
				'assets/icons.*.*'
			],
			additional: [':externals:'],
			optional: [':rest:']
		},
		externals: [
			'/auth',
			'https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin'
		],
		ServiceWorker: {
			events: true,
			navigateFallbackURL: '/auth?offline=true',
			navigateFallbackForRedirects: false
		},
		AppCache: false
	})
)

export default base
