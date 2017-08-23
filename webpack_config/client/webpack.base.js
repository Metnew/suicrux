import path from 'path'
import child_process from 'child_process'
import webpack from 'webpack'
import config from '../config'
import isomorphicWebpackConfig from '../webpack.isomorphic'
import {StatsWriterPlugin} from 'webpack-stats-plugin'
// import ManifestPlugin from 'webpack-manifest-plugin'
import WebpackAssetsManifest from 'webpack-assets-manifest'
import _ from 'lodash'

const {
	GA_ID,
	SENTRY_PUBLIC_DSN,
	NODE_ENV,
	srcPath,
	distPath,
	publicPath,
	isProduction
} = config
const exec = child_process.execSync
exec(`rm -rf ${config.distPath}/client`)

const definePluginArgs = {
	'process.env.GA_ID': JSON.stringify(GA_ID),
	'process.env.SENTRY_PUBLIC_DSN': JSON.stringify(SENTRY_PUBLIC_DSN),
	'process.env.BROWSER': JSON.stringify(true)
}

// use hash filename to support long-term caching in production
const filename = isProduction ? '[name].[chunkhash:8].js' : '[name].js'
const hints = isProduction ? 'warning' : false
const devtool = isProduction ? 'cheap-source-map' : 'source-map'

const baseBuild = {
	name: 'client',
	entry: {
		client: path.join(srcPath, './client')
	},
	output: {
		filename,
		publicPath,
		path: path.join(distPath, './client'),
		chunkFilename: '[name].[chunkhash:6].js',
		crossOriginLoading: 'anonymous'
	},
	performance: {
		hints
	},
	resolve: {
		alias: isomorphicWebpackConfig.resolve.alias,
		modules: isomorphicWebpackConfig.resolve.modules,
		extensions: isomorphicWebpackConfig.resolve.extensions.concat([
			'.css',
			'.scss',
			'.sass'
		])
	},
	module: {
		rules: isomorphicWebpackConfig.module.rules.concat([
			{
				test: /\.(ico|eot|otf|webp|ttf|woff|woff2)$/i,
				use: `file-loader?limit=100000&name=assets/[name].[hash:8].[ext]`
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							// path: '/images',
							name: 'images/[name].[hash:8].[ext]'
						}
					},
					'img-loader'
				]
			}
			// NOTE: LQIP loader doesn't work with file-loader and url-loader :(
			// `npm i --save-dev lqip-loader`
			// {
			//   test: /\.(jpe?g|png)$/i,
			//   enforce: 'pre',
			//   loaders: [
			//     {
			//       loader: 'lqip-loader',
			//       options: {
			//         path: '/images-lqip', // your image going to be in media folder in the output dir
			//         name: '[name]-lqip.[hash:8].[ext]' // you can use [hash].[ext] too if you wish
			//       }
			//     }
			//   ]
			// }
		])
	},
	plugins: isomorphicWebpackConfig.plugins.concat([
		new webpack.DefinePlugin(definePluginArgs),
		new StatsWriterPlugin({
			filename: 'stats.json' // Default
		}),
		new WebpackAssetsManifest({writeToDisk: true})
	]),
	target: 'web'
}

export default baseBuild
