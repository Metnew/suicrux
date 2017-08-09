import path from 'path'
import webpack from 'webpack'
// import _ from 'lodash'
import config from '../config'
import baseWebpackConfig from './webpack.base'
import WebpackShellPlugin from 'webpack-shell-plugin'
import FriendlyErrors from 'friendly-errors-webpack-plugin'

const plugins = [
	new WebpackShellPlugin({
		onBuildEnd: [`nodemon ${path.join(config.distPath, '/server', config.APP_LANGUAGE)}`]
	}),
	// new webpack.HotModuleReplacementPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
	new FriendlyErrors()
]

const build = Object.assign({}, baseWebpackConfig, {
	// entry: config.entry.concat(['webpack/hot/poll?1000']),
	devtool: 'eval-source-map',
	watch: true,
	plugins: baseWebpackConfig.plugins.concat(plugins)
})

export default build
