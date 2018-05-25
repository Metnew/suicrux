import path from 'path'
import webpack from 'webpack'
import rimraf from 'rimraf'
import config from '../config'
import isomorphicWebpackConfig from '../webpack.isomorphic'
import nodeExternals from 'webpack-node-externals'
const {SENTRY_DSN, CLIENT_STATIC_PATH, CLIENT_ASSETS_MANIFEST, isProduction, publicPath} = config

// Clear dist dir before run
rimraf(`${config.distPath}/server`, {}, () => {})

const definePluginArgs = {
	'process.env.BROWSER': JSON.stringify(false),
	'process.env.SENTRY_DSN': JSON.stringify(SENTRY_DSN),
	'process.env.CLIENT_STATIC_PATH': JSON.stringify(CLIENT_STATIC_PATH),
	'process.env.CLIENT_ASSETS_MANIFEST': JSON.stringify(CLIENT_ASSETS_MANIFEST)
}

const devtool = isProduction ? 'cheap-source-map' : 'eval'
const chunkFilename = isProduction ? '[name].[chunkhash:6].js' : '[name].js'

const baseWebpackConfig = {
	name: 'server',
	entry: config.srcPath,
	devtool,
	target: 'node',
	output: {
		path: path.join(config.distPath, './server'),
		filename: 'index.js',
		chunkFilename,
		publicPath
	},
	externals: [
		nodeExternals({
			whitelist: [
				!isProduction ? 'webpack/hot/poll?300' : null,
				/\.(eot|woff|woff2|ttf|otf)$/,
				/\.(svg|png|jpg|jpeg|gif|ico)$/,
				/\.(mp4|mp3|ogg|swf|webp)$/,
				/\.(css|scss|sass|sss|less)$/
			].filter(x => x)
		})
	],
	performance: {
		hints: false
	},
	resolve: {
		extensions: isomorphicWebpackConfig.resolve.extensions,
		modules: isomorphicWebpackConfig.resolve.modules,
		alias: isomorphicWebpackConfig.resolve.alias
	},
	module: {
		rules: isomorphicWebpackConfig.module.rules.concat(
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 4096,
							name: 'images/[name].[hash:6].[ext]',
							emitFile: false
						}
					}
				]
			}
		)
	},
	plugins: isomorphicWebpackConfig.plugins.concat([
		new webpack.DefinePlugin(definePluginArgs),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1
		}),
		// ignore styles, because server hasn't got style-loader
		new webpack.NormalModuleReplacementPlugin(/\.(css|sass|less|scss|sss)$/, 'node-noop')
	]),
	node: {
		__dirname: true,
		__filename: true,
		console: true,
		global: true
	}
}

export default baseWebpackConfig
