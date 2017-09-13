import webpack from 'webpack'
import baseWebpackConfig from './webpack.base'
import WriteFilePlugin from 'write-file-webpack-plugin'
import AutoDllPlugin from 'autodll-webpack-plugin'
import config from '../config'

const filename = '[name].js'
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

baseWebpackConfig.entry.client = [
	'react-hot-loader/patch',
	'webpack-hot-middleware/client?reload=true',
	baseWebpackConfig.entry.client
]

// add dev plugins
baseWebpackConfig.plugins.push(
	new WriteFilePlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new AutoDllPlugin({
		debug: true,
		filename,
		entry: {
			vendor: config.vendor,
			polyfills: config.polyfills
		}
	})
)

export default baseWebpackConfig
