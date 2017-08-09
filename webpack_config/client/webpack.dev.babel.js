import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import baseWebpackConfig from './webpack.base'
import FriendlyErrors from 'friendly-errors-webpack-plugin'
import config from '../config'
import _ from 'lodash'

const loaders = {
	style: {loader: 'style-loader'},
	css: {loader: 'css-loader', options: {sourceMap: true}},
	resolve: 'resolve-url-loader',
	postcss: {
		loader: 'postcss-loader',
		options: {
			sourceMap: true
		}
	},
	sass: {loader: 'sass-loader', options: {sourceMap: true}}
}

baseWebpackConfig.devtool = 'eval-source-map'
baseWebpackConfig.module.rules.push(
	{
		test: /\.css$/,
		loaders: [loaders.style, loaders.css, loaders.postcss, loaders.resolve]
	},
	{
		test: /\.scss$/,
		loaders: [
			loaders.style,
			loaders.css,
			loaders.postcss,
			loaders.resolve,
			loaders.sass
		]
	}
)

// add dev plugins
baseWebpackConfig.plugins.push(
	// add index.html
	new HtmlWebpackPlugin({
		title: config.title,
		template: path.resolve(config.rootPath, 'webpack_config', 'assets', 'index.ejs')
	}),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
	new FriendlyErrors()
)

export default baseWebpackConfig
