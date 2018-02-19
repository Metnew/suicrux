import baseWebpackConfig from './webpack.base'
import StartServerPlugin from 'start-server-webpack-plugin'
import webpack from 'webpack'
import config from '../config'

const {CLIENT_ASSETS_MANIFEST} = config
const plugins = [
	new webpack.HotModuleReplacementPlugin(),
	new StartServerPlugin({
		name: 'index.js',
		nodeArgs: process.env.INSPECT_ENABLED ? ['--inspect'] : []
	}),
	// Ignore assets.json to avoid infinite recompile bug
	new webpack.WatchIgnorePlugin([CLIENT_ASSETS_MANIFEST])
]

export default Object.assign({}, baseWebpackConfig, {
	entry: [baseWebpackConfig.entry, 'webpack/hot/poll?300'],
	watch: true,
	plugins: baseWebpackConfig.plugins.concat(plugins)
})
