import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import ProgressPlugin from 'webpack/lib/ProgressPlugin'
import OfflinePlugin from 'offline-plugin'
import OptimizeJsPlugin from 'optimize-js-plugin'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import base from './webpack.base'
import config from '../config'

// Do you want to use bundle analyzer?
if (config.ANALYZE_BUNDLE) {
	base.plugins.push(new BundleAnalyzerPlugin({analyzerMode: 'static'}))
}

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

// Production plugins
base.plugins.push(
	new ProgressPlugin(),
	new ExtractTextPlugin({
		filename: '[name].[hash:6].css',
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
	new webpack.optimize.UglifyJsPlugin({
		sourceMap: true,
		compress: {
			warnings: false,
			unused: true,
			dead_code: true,
			// This option removes console.log in production
			drop_console: true
		},
		output: {
			comments: false
		}
	}),
	new OptimizeJsPlugin({
		sourceMap: true
	}),
	// extract vendor chunks
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: module => {
			// this assumes your vendor imports exist in the node_modules directory
			return module.context && module.context.indexOf('node_modules') !== -1
		}
	}),
	// manifest chunk, more info in webpack docs
	new webpack.optimize.CommonsChunkPlugin({
		name: 'manifest'
	}),
	new CompressionPlugin({
		algorithm: 'gzip'
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
			'https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin'
		],
		safeToUseOptionalCaches: true,
		AppCache: false
	})
)

export default base
