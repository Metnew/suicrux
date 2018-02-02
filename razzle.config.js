// const path = require('path')

module.exports = {
	modify (config, {target, dev}, webpack) {
		const client = require('./webpack_config/client/webpack.dev.babel')
		const server = require('./webpack_config/server/webpack.dev.babel')
		const assign = Object.assign

		if (target === 'web') {
			return assign({}, config, {
				entry: {
					client: [...new Set(config.entry.client.concat(client.entry.client))]
				},
				resolve: {
					...config.resolve,
					alias: assign({}, config.resolve.alias, client.resolve.alias),
					modules: [...config.resolve.modules, ...client.resolve.modules]
				},
				plugins: config.plugins.concat(client.plugins)
			})
		} else if (target === 'node') {
			return assign({}, config, {
				resolve: {
					...config.resolve,
					alias: assign({}, config.resolve.alias, server.resolve.alias),
					modules: [...config.resolve.modules, ...server.resolve.modules]
				},
				plugins: config.plugins.concat(server.plugins)
			})
		}

		console.error('Unknown target, return default config.')
		return config
	}
}
