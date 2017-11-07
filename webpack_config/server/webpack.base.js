import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import rimraf from 'rimraf'
import config from '../config'
import isomorphicWebpackConfig from '../webpack.isomorphic'
const {SENTRY_DSN, CLIENT_DIST_PATH, JWT_SECRET, HTTP_PORT, isProduction} = config

// Clear dist dir before run
rimraf(`${config.distPath}/server`, {}, () => {})

const definePluginArgs = {
	'process.env.BROWSER': JSON.stringify(false),
	'process.env.HTTP_PORT': JSON.stringify(HTTP_PORT),
	'process.env.JWT_SECRET': JSON.stringify(JWT_SECRET),
	'process.env.SENTRY_DSN': JSON.stringify(SENTRY_DSN),
	'process.env.CLIENT_DIST_PATH': JSON.stringify(CLIENT_DIST_PATH)
}

const devtool = isProduction ? 'cheap-source-map' : 'eval'
const chunkFilename = isProduction ? '[name].[chunkhash:6].js' : '[name].js'
const entry = isProduction
	? path.join(config.srcPath, './server')
	: path.join(config.srcPath, './server/server')

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
	entry,
	devtool,
	target: 'node',
	output: {
		path: path.join(config.distPath, './server'),
		filename: 'index.js',
		chunkFilename,
		libraryTarget: 'commonjs2'
	},
	externals: nodeModules,
	performance: {
		hints: false
	},
	resolve: {
		extensions: isomorphicWebpackConfig.resolve.extensions,
		modules: isomorphicWebpackConfig.resolve.modules,
		alias: {
			...isomorphicWebpackConfig.resolve.alias,
			locals: `${config.rootPath}/locals`
		}
	},
	module: {
		rules: isomorphicWebpackConfig.module.rules.concat([
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
		new webpack.NormalModuleReplacementPlugin(
			/\.(css|sass|less|scss)$/,
			'node-noop'
		),
		new webpack.DefinePlugin(definePluginArgs)
	]),
	node: {
		__dirname: true,
		global: true
	}
}

export default baseWebpackConfig
