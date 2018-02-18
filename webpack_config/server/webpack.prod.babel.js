import webpack from 'webpack'
import config from '../config'
import baseWebpackConfig from './webpack.base'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import OptimizeJsPlugin from 'optimize-js-plugin'

if (config.ANALYZE_BUNDLE) {
	baseWebpackConfig.plugins.push(new BundleAnalyzerPlugin({analyzerMode: 'static'}))
}

baseWebpackConfig.plugins.push(
	new webpack.ProgressPlugin(),
	new webpack.optimize.ModuleConcatenationPlugin(),
	new webpack.optimize.UglifyJsPlugin({
		sourceMap: true,
		compress: {
			warnings: false,
			unused: true,
			dead_code: true,
			// This option removes console.log in production
			drop_console: true
		},
		output: {
			comments: false
		}
	}),
	new OptimizeJsPlugin({
		sourceMap: true
	})
)

export default baseWebpackConfig
