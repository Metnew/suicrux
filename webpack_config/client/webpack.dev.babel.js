import webpack from 'webpack'
import baseWebpackConfig from './webpack.base'
import WriteFilePlugin from 'write-file-webpack-plugin'
import AutoDllPlugin from 'autodll-webpack-plugin'
import FriendlyErrorsPlugin from 'razzle-dev-utils/FriendlyErrorsPlugin'
import config from '../config'

const {vendor, polyfills, DEV_SERVER_PORT, HOST, PORT} = config
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
	`webpack-dev-server/client?http://${HOST}:${DEV_SERVER_PORT}/`,
	'webpack/hot/only-dev-server',
	'react-hot-loader/patch',
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
			vendor,
			polyfills
		}
	}),
	new FriendlyErrorsPlugin({
		verbose: true,
		target: 'web',
		onSuccessMessage: `Your application is running at http://${HOST}:${PORT}`
	})
)

baseWebpackConfig.devServer = {
	disableHostCheck: true,
	clientLogLevel: 'none',
	// Enable gzip compression of generated files.
	compress: true,
	// watchContentBase: true,
	headers: {
		'Access-Control-Allow-Origin': '*'
	},
	historyApiFallback: {
		// Paths with dots should still use the history fallback.
		// See https://github.com/facebookincubator/create-react-app/issues/387.
		disableDotRule: true
	},
	host: HOST,
	hot: true,
	inline: true,
	// noInfo: true,
	overlay: true,
	port: DEV_SERVER_PORT,
	publicPath: `http://${HOST}:${DEV_SERVER_PORT}/`,
	// quiet: true,
	// By default files from `contentBase` will not trigger a page reload.
	// Reportedly, this avoids CPU overload on some systems.
	// https://github.com/facebookincubator/create-react-app/issues/293
	watchOptions: {
		ignored: /node_modules/
	}
}

export default baseWebpackConfig
