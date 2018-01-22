const baseWebpackConfig = require('./webpack.base')

const plugins = []

module.exports = Object.assign({}, baseWebpackConfig, {
	plugins: baseWebpackConfig.plugins.concat(plugins)
})
