import path from 'path'
import rimraf from 'rimraf'
import webpack from 'webpack'
import config from '../config'
import isomorphicWebpackConfig from '../webpack.isomorphic'
import AssetsPlugin from 'assets-webpack-plugin'
import WebpackAssetsManifest from 'webpack-assets-manifest'
const {
	GA_ID,
	SENTRY_PUBLIC_DSN,
	CLIENT_STATIC_PATH,
	srcPath,
	publicPath,
	isProduction,
	manifest,
	distPath
} = config

rimraf(`${distPath}/client`, {}, () => {})

const definePluginArgs = {
	'process.env.BASE_API': JSON.stringify(BASE_API),
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
				use: `file-loader?limit=100000&name=assets/[name].[hash:6].[ext]`
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
		})
	]),
	target: 'web'
}

export default baseBuild
