import path from 'path'
import childProcess from 'child_process'
import webpack from 'webpack'
import config from '../config'
import isomorphicWebpackConfig from '../webpack.isomorphic'
import AssetsPlugin from 'assets-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import WebpackAssetsManifest from 'webpack-assets-manifest'
const {
	GA_ID,
	SENTRY_PUBLIC_DSN,
	CLIENT_DIST_PATH,
	srcPath,
	publicPath,
	isProduction,
	title,
	manifest
} = config

const exec = childProcess.execSync
exec(`rm -rf ${CLIENT_DIST_PATH}`)

const definePluginArgs = {
	'process.env.GA_ID': JSON.stringify(GA_ID),
	'process.env.SENTRY_PUBLIC_DSN': JSON.stringify(SENTRY_PUBLIC_DSN),
	'process.env.BROWSER': JSON.stringify(true)
}

// use hash filename to support long-term caching in production
const filename = isProduction ? '[name].[chunkhash:8].js' : '[name].js'
const hints = isProduction ? 'warning' : false
const devtool = isProduction ? 'cheap-source-map' : 'source-map'

const baseBuild = {
	name: 'client',
	devtool,
	entry: {
		client: path.join(srcPath, './client')
	},
	output: {
		filename,
		publicPath,
		path: CLIENT_DIST_PATH,
		chunkFilename: '[name].[chunkhash:6].js',
		crossOriginLoading: 'anonymous'
	},
	performance: {
		hints
	},
	resolve: {
		alias: isomorphicWebpackConfig.resolve.alias,
		modules: isomorphicWebpackConfig.resolve.modules,
		extensions: isomorphicWebpackConfig.resolve.extensions.concat([
			'.css',
			'.scss',
			'.sass'
		])
	},
	module: {
		rules: isomorphicWebpackConfig.module.rules.concat([
			{
				test: /\.(ico|eot|otf|webp|ttf|woff|woff2)$/i,
				use: `file-loader?limit=100000&name=assets/[name].[hash:8].[ext]`
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							// path: '/images',
							name: 'images/[name].[hash:8].[ext]'
						}
					},
					'img-loader'
				]
			}
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
		])
	},
	plugins: isomorphicWebpackConfig.plugins.concat([
		new webpack.DefinePlugin(definePluginArgs),
		new AssetsPlugin({
			path: CLIENT_DIST_PATH
		}),
		// NOTE: this plugin is good, but there are few big issues:
		// 1. It sets invalid url to browserconfig.xml and manifest.json in index.html.
		// E.g: in generated index.html you can see:
		// <meta name="msapplication-config" content="browserconfig.xml">
		// 2. It looks like generated images aren't minified.(not sure)
		// NOTE: It would be better to generate favicons without this plugin.
		new FaviconsWebpackPlugin({
			// add theme-color property
			background: manifest.theme,
			prefix: `favicons/`,
			logo: path.resolve(config.rootPath, './static/images/logo.png'),
			title,
			emitStats: true,
			statsFilename: 'favicons-stats.json',
			// Inject the html into the html-webpack-plugin
			inject: false,
			// which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
			icons: {
				android: true,
				appleIcon: true,
				appleStartup: true,
				coast: false,
				favicons: true,
				firefox: true,
				opengraph: false,
				twitter: true,
				yandex: false,
				windows: true
			}
		}),
		new WebpackAssetsManifest({
			assets: config.manifest
		})
	]),
	target: 'web'
}

export default baseBuild
