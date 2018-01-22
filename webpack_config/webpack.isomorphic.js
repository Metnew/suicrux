/**
 * @file
 */
const path = require('path')
const config = require('./config')
const webpack = require('webpack')
const CircularDependencyPlugin = require('circular-dependency-plugin')

const {
	srcPath,
	rootPath,
	srcCommonPath,
	NODE_ENV,
	GA_ID,
	SENTRY_PUBLIC_DSN
} = config

const definePluginArgs = {
	'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
	'process.env.GA_ID': JSON.stringify(GA_ID),
	'process.env.SENTRY_PUBLIC_DSN': JSON.stringify(SENTRY_PUBLIC_DSN)
}

module.exports = {
	resolve: {
		alias: {
			actions: `${srcCommonPath}/actions`,
			api: `${srcCommonPath}/api`,
			components: `${srcCommonPath}/components`,
			containers: `${srcCommonPath}/containers`,
			reducers: `${srcCommonPath}/reducers`,
			routing: `${srcCommonPath}/routing`,
			styles: `${srcCommonPath}/styles`,
			types: `${srcCommonPath}/types`,
			selectors: `${srcCommonPath}/selectors`,
			public: `${rootPath}/public`
		},
		modules: [srcPath, path.join(rootPath, 'node_modules')]
	},
	module: {
		rules: [
			// {
			// 	test: /\.(js|jsx)$/,
			// 	enforce: 'pre',
			// 	use: [
			// 		{
			// 			loader: 'eslint-loader',
			// 			options: {
			// 				fix: true
			// 			}
			// 		}
			// 	],
			// 	exclude: [/node_modules/]
			// },
		]
	},
	plugins: [
		new webpack.BannerPlugin({
			banner: config.banner
		}),
		// new CircularDependencyPlugin({
		// 	exclude: /node_modules/
		// }),
		new webpack.DefinePlugin(definePluginArgs)
	]
}
