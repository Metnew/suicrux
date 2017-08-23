import path from 'path'
import webpack from 'webpack'
import config from '../config'
import baseWebpackConfig from './webpack.base'
import WebpackShellPlugin from 'webpack-shell-plugin'
import FriendlyErrors from 'friendly-errors-webpack-plugin'
import AutoDllPlugin from 'autodll-webpack-plugin'

const plugins = []

const build = Object.assign({}, baseWebpackConfig, {
	plugins: baseWebpackConfig.plugins.concat(plugins)
})

export default build
