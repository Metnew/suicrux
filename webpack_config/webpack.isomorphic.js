/**
 * @file
 */
import path from 'path'
import config from './config'
import webpack from 'webpack'
import CircularDependencyPlugin from 'circular-dependency-plugin'

const {srcPath, rootPath, srcCommonPath, NODE_ENV, GA_ID, SENTRY_PUBLIC_DSN} = config

const definePluginArgs = {
	'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
	'process.env.GA_ID': JSON.stringify(GA_ID),
	'process.env.SENTRY_PUBLIC_DSN': JSON.stringify(SENTRY_PUBLIC_DSN)
}

export default {
	resolve: {
		alias: {
			actions: `${srcCommonPath}/actions/`,
			api: `${srcCommonPath}/api/`,
			components: `${srcCommonPath}/components/`,
			containers: `${srcCommonPath}/containers/`,
			reducers: `${srcCommonPath}/reducers/`,
			routing: `${srcCommonPath}/routing/`,
			styles: `${srcCommonPath}/styles/`,
			types: `${srcCommonPath}/types`,
			selectors: `${srcCommonPath}/selectors`,
			static: `${rootPath}/static`,
			images: `${rootPath}/static/images`
		},
		extensions: ['.js', '.json', '.jsx'],
		modules: [srcPath, path.join(rootPath, 'node_modules')]
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				enforce: 'pre',
				use: [
					{
						loader: 'eslint-loader',
						options: {
							fix: true
						}
					}
				],
				exclude: [/node_modules/]
			},
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: [/node_modules/]
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
					},
					'img-loader'
				]
			}
		]
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.BannerPlugin({
			banner: config.banner
		}),
		new CircularDependencyPlugin({
			exclude: /node_modules/
		}),
		new webpack.DefinePlugin(definePluginArgs)
	]
}
