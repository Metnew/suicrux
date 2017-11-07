/**
 * @file
 */
import path from 'path'
import config from './config'
import webpack from 'webpack'
import CircularDependencyPlugin from 'circular-dependency-plugin'

const {srcPath, rootPath, srcCommonPath, BASE_API, NODE_ENV} = config

const definePluginArgs = {
	'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
	'process.env.BASE_API': JSON.stringify(BASE_API)
}

export default {
	resolve: {
		// Aliases that both server and client use
		// Probably, it's a bad example, because here we defined only client's aliases.
		alias: {
			// locals: `${srcCommonPath}/i18n/`,
			actions: `${srcCommonPath}/actions/`,
			api: `${srcCommonPath}/api/`,
			components: `${srcCommonPath}/components/`,
			const: `${srcCommonPath}/const/`,
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
