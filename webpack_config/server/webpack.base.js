import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import rimraf from 'rimraf'
import config from '../config'
import isomorphicWebpackConfig from '../webpack.isomorphic'
import _ from 'lodash'
import I18nPlugin from 'i18n-webpack-plugin'

const {
	SENTRY_DSN,
	DIST_PATH,
	APP_LANGUAGE,
	JWT_SECRET,
	ANALYZE_BUNDLE,
	PORT
} = config

// Cleare dist dir before run
rimraf(`${config.distPath}/server/${APP_LANGUAGE}`, {}, () => {})

const definePluginArgs = {
	'process.env.BROWSER': JSON.stringify(false),
	'process.env.PORT': JSON.stringify(PORT),
	'process.env.JWT_SECRET': JSON.stringify(JWT_SECRET),
	'process.env.SENTRY_DSN': JSON.stringify(SENTRY_DSN),
	'process.env.DIST_PATH': JSON.stringify(DIST_PATH)
}

let nodeModules = {}
fs
	.readdirSync('node_modules')
	.filter(function (x) {
		return ['.bin'].indexOf(x) === -1
	})
	.forEach(function (mod) {
		nodeModules[mod] = 'commonjs ' + mod
	})

const baseWebpackConfig = {
	entry: [path.join(config.srcPath, './server/index')],
	target: 'node',
	output: {
		path: path.join(config.distPath, './server', APP_LANGUAGE),
		filename: 'index.js'
	},
	externals: nodeModules,
	performance: {
		hints: false
	},
	resolve: {
		extensions: isomorphicWebpackConfig.resolve.extensions,
		modules: isomorphicWebpackConfig.resolve.modules,
		alias: isomorphicWebpackConfig.resolve.alias
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
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 25000,
							name: 'images/[name].[hash:8].[ext]'
						}
					},
					'img-loader'
				]
			}
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
