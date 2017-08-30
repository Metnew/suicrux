import path from 'path'
import webpack from 'webpack'
import config from '../config'
import isomorphicWebpackConfig from '../webpack.isomorphic'
import ManifestPlugin from 'webpack-manifest-plugin'
import _ from 'lodash'
//
const {
	GA_ID,
	SENTRY_PUBLIC_DSN,
	NODE_ENV,
	APP_LANGUAGE,
	srcPath,
	distPath,
	publicPath
} = config

const definePluginArgs = {
	'process.env.GA_ID': JSON.stringify(GA_ID),
	'process.env.SENTRY_PUBLIC_DSN': JSON.stringify(SENTRY_PUBLIC_DSN),
	'process.env.BROWSER': JSON.stringify(true)
}

const baseBuild = {
	entry: {
		client: path.join(srcPath, './client')
	},
	output: {
		path: path.join(distPath, './client', APP_LANGUAGE),
		filename: '[name].js',
		chunkFilename: '[name].[chunkhash:6].js',
		publicPath
	},
	performance: {
		hints: NODE_ENV === 'production' ? 'warning' : false
	},
	resolve: {
		alias: isomorphicWebpackConfig.resolve.alias,
		modules: isomorphicWebpackConfig.resolve.modules,
		extensions: isomorphicWebpackConfig.resolve.extensions.concat(['.css', '.scss', '.sass'])
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
		new ManifestPlugin({fileName: 'manifest.json', cache: config.manifest})
	]),
	target: 'web'
}

export default baseBuild
