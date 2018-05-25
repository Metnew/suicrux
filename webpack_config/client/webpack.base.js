import path from 'path'
import rimraf from 'rimraf'
import webpack from 'webpack'
import config from '../config'
import isomorphicWebpackConfig from '../webpack.isomorphic'
import AssetsPlugin from 'assets-webpack-plugin'
import WebpackAssetsManifest from 'webpack-assets-manifest'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const {
	GA_ID,
	SENTRY_PUBLIC_DSN,
	CLIENT_STATIC_PATH,
	srcPath,
	publicPath,
	rootPath,
	isProduction,
	manifest,
	distPath
} = config

rimraf(`${distPath}/client`, {}, () => {})

const definePluginArgs = {
	'process.env.GA_ID': JSON.stringify(GA_ID),
	'process.env.SENTRY_PUBLIC_DSN': JSON.stringify(SENTRY_PUBLIC_DSN),
	'process.env.BROWSER': JSON.stringify(true)
}

// use hash filename to support long-term caching in production
// NOTE: [chunkhash] leads to high memory consumption
const filename = isProduction ? '[name].[hash:6].js' : '[name].js'
const chunkFilename = isProduction ? '[name].[chunkhash:6].js' : '[name].js'
const hints = isProduction ? 'warning' : false
const devtool = isProduction ? 'cheap-source-map' : 'eval'
const baseBuild = {
	name: 'client',
	devtool,
	entry: {
		client: path.join(srcPath, './client')
	},
	output: {
		filename,
		publicPath,
		path: CLIENT_STATIC_PATH,
		chunkFilename,
		crossOriginLoading: 'anonymous'
	},
	performance: {
		hints
	},
	resolve: {
		alias: isomorphicWebpackConfig.resolve.alias,
		modules: isomorphicWebpackConfig.resolve.modules,
		extensions: isomorphicWebpackConfig.resolve.extensions.concat(['.css', '.scss', '.sass'])
	},
	module: {
		rules: isomorphicWebpackConfig.module.rules.concat([
			{
				test: /\.(ico|eot|otf|webp|ttf|woff|woff2)$/i,
				use: `file-loader?limit=100000&name=assets/[name].[hash:6].[ext]`
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 4096,
							name: 'images/[name].[hash:6].[ext]'
						}
					}
				]
			}
		])
	},
	plugins: isomorphicWebpackConfig.plugins.concat([
		new webpack.DefinePlugin(definePluginArgs),
		new AssetsPlugin({
			filename: 'webpack-assets.json',
			path: CLIENT_STATIC_PATH
		}),
		new WebpackAssetsManifest({
			assets: manifest
		}),
		new CopyWebpackPlugin([
			{
				from: `${rootPath}/static/public`,
				to: './'
			}
		])
	]),
	target: 'web'
}

export default baseBuild
