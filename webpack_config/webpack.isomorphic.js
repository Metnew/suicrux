import path from 'path'
import config from './config'
import webpack from 'webpack'
import I18nPlugin from 'i18n-webpack-plugin'
import CircularDependencyPlugin from 'circular-dependency-plugin'

const {
	srcPath,
	rootPath,
	srcCommonPath,
	APP_LANGUAGE,
	BASE_API,
	NODE_ENV,
	i18n
} = config

const definePluginArgs = {
	'process.env.APP_LANGUAGE': JSON.stringify(APP_LANGUAGE),
	'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
	'process.env.BASE_API': JSON.stringify(BASE_API)
}

const languageTranslation = (function () {
	const isTranslationExists = i18n.hasOwnProperty(APP_LANGUAGE)
	if (isTranslationExists) {
		return i18n[APP_LANGUAGE]
	} else {
		throw new Error(
			`Something went wrong with your i18n. Check that "${APP_LANGUAGE}" property exists in i18n object.`
		)
	}
})()

export default {
	resolve: {
		// Aliases that both server and client use
		// Probably, it's a bad example, because here we defined only client's aliases.
		alias: {
			actions: `${srcCommonPath}/actions/`,
			api: `${srcCommonPath}/api/`,
			components: `${srcCommonPath}/components/`,
			containers: `${srcCommonPath}/containers/`,
			reducers: `${srcCommonPath}/reducers/`,
			routing: `${srcCommonPath}/routing/`,
			styles: `${srcCommonPath}/styles/`,
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
			}
		]
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.BannerPlugin({
			banner: config.banner
		}),
		new CircularDependencyPlugin({
			// exclude detection of files based on a RegExp
			exclude: /node_modules/
			// add errors to webpack instead of warnings
			// failOnError: true
		}),
		new I18nPlugin(languageTranslation, {functionName: 'i18n'}),
		new webpack.DefinePlugin(definePluginArgs)
	]
}
