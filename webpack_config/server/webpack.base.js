import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import rimraf from 'rimraf'
import config from '../config'
import isomorphicWebpackConfig from '../webpack.isomorphic'
<<<<<<< HEAD
const {SENTRY_DSN, CLIENT_DIST_PATH, JWT_SECRET, PORT, publicPath, BASE_API_SSR, API_PREFIX, isProduction} = config
=======
import nodeExternals from 'webpack-node-externals'
const {SENTRY_DSN, CLIENT_STATIC_PATH, CLIENT_ASSETS_MANIFEST, publicPath, isProduction} = config
>>>>>>> feat/3.0-release

// Clear dist dir before run
rimraf(`${config.distPath}/server`, {}, () => {})

const chunkFilename = isProduction ? '[name].[chunkhash:6].js' : '[name].js'
const devtool = isProduction ? 'cheap-source-map' : 'eval'
const entry = isProduction
	? path.join(config.srcPath, './server')
	: path.join(config.srcPath, './server/server')

const definePluginArgs = {
	'process.env.BROWSER': JSON.stringify(false),
	'process.env.SENTRY_DSN': JSON.stringify(SENTRY_DSN),
<<<<<<< HEAD
	'process.env.CLIENT_DIST_PATH': JSON.stringify(CLIENT_DIST_PATH),
	'process.env.BASE_API': JSON.stringify(BASE_API_SSR),
	'process.env.API_PREFIX': JSON.stringify(API_PREFIX)
}

=======
	'process.env.CLIENT_STATIC_PATH': JSON.stringify(CLIENT_STATIC_PATH),
	'process.env.CLIENT_ASSETS_MANIFEST': JSON.stringify(CLIENT_ASSETS_MANIFEST)
}

const devtool = isProduction ? 'cheap-source-map' : 'eval'
const chunkFilename = isProduction ? '[name].[chunkhash:6].js' : '[name].js'

>>>>>>> feat/3.0-release
let nodeModules = {}
fs
	.readdirSync('node_modules')
	.filter(x => {
		return ['.bin'].indexOf(x) === -1
	})
	.forEach(mod => {
		nodeModules[mod] = 'commonjs ' + mod
	})

const baseWebpackConfig = {
	name: 'server',
	entry: config.srcPath,
	devtool,
	target: 'node',
	output: {
		path: path.join(config.distPath, './server'),
		filename: 'index.js',
		chunkFilename,
		publicPath,
		libraryTarget: 'commonjs2'
	},
	externals: [
		nodeExternals({
			whitelist: [
				!isProduction ? 'webpack/hot/poll?300' : null,
				/\.(eot|woff|woff2|ttf|otf)$/,
				/\.(svg|png|jpg|jpeg|gif|ico)$/,
				/\.(mp4|mp3|ogg|swf|webp)$/,
				/\.(css|scss|sass|sss|less)$/
			].filter(x => x)
		})
	],
	performance: {
		hints: false
	},
	resolve: {
		extensions: isomorphicWebpackConfig.resolve.extensions,
		modules: isomorphicWebpackConfig.resolve.modules,
		alias: isomorphicWebpackConfig.resolve.alias
	},
	module: {
		rules: isomorphicWebpackConfig.module.rules
	},
	plugins: isomorphicWebpackConfig.plugins.concat([
		new webpack.DefinePlugin(definePluginArgs),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1
		})
	]),
	node: {
		__dirname: true,
		__filename: true,
		console: true,
		global: true
	}
}

export default baseWebpackConfig
