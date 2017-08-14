import path from 'path'
import webpack from 'webpack'
import config from '../config'
import baseWebpackConfig from './webpack.base'
import WebpackShellPlugin from 'webpack-shell-plugin'
import FriendlyErrors from 'friendly-errors-webpack-plugin'

const plugins = []

const build = Object.assign({}, baseWebpackConfig, {
	devtool: 'eval-source-map',
	watch: true,
	plugins: baseWebpackConfig.plugins.concat(plugins)
})

export default build
