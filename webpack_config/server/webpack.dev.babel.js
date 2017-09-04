import baseWebpackConfig from './webpack.base'

const plugins = []

const build = Object.assign({}, baseWebpackConfig, {
	plugins: baseWebpackConfig.plugins.concat(plugins)
})

export default build
