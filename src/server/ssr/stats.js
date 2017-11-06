// @flow
import fs from 'fs'

let cache = {}

async function getFile (path) {
	// Cache file forever
	if (cache[path]) {
		console.log('from cache')
		return Promise.resolve(cache[path])
	}

	return new Promise((resolve, reject) => {
		// Give Webpack some time on first stats generation
		setTimeout(() => {
			fs.readFile(path, 'utf8', (err, data) => {
				if (err) {
					throw err
				}
				const json = JSON.parse(data)
				cache[path] = json
				resolve(json)
			})
		}, 4000)
	})
}

export default async function () {
	const basePath = process.env.CLIENT_DIST_PATH
	const assets = await getFile(`${basePath}/webpack-assets.json`)
	const faviconsAssets = await getFile(`${basePath}/favicons-stats.json`)

	return {
		assets,
		faviconsAssets
	}
}
