const baseWebpackConfig = require('./webpack.base')

const loaders = {
	style: {loader: 'style-loader'},
	css: {loader: 'css-loader', options: {sourceMap: true}},
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
		loaders: [loaders.style, loaders.css, loaders.postcss]
	},
	{
		test: /\.scss$/,
		loaders: [
			loaders.style,
			loaders.css,
			loaders.postcss,
			loaders.sass
		]
	}
)

baseWebpackConfig.entry.client = [
	'react-hot-loader/patch',
	baseWebpackConfig.entry.client
]

module.exports = baseWebpackConfig
