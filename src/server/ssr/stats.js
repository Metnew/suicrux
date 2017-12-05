// @flow
import fs from 'fs'
import chokidar from 'chokidar'

let cache = {}

async function getFile (path) {
	// Cache file forever
	if (cache[path]) {
		return Promise.resolve(cache[path])
	}

	return new Promise((resolve, reject) => {
		// This `readFile` func is looking like it escaped from procedure programming
		const readFile = () => {
			fs.readFile(path, 'utf8', (err, data) => {
				if (err) {
					throw err
				}
				const json = JSON.parse(data)
				cache[path] = json
				resolve(json)
			})
		}
		// does file exist?
		fs.access(path, fs.constants.R_OK, err => {
			if (err) {
				// No. Watch for changes, resolve on `add`.
				chokidar.watch(path).on('add', readFile)
			} else {
				// Yes. resolve!
				readFile()
			}
		})
	})
}

export default async function () {
	const basePath = process.env.CLIENT_DIST_PATH
	// flow-disable-next-line: This type cannot be coerced to string
	const assets = await getFile(`${basePath}/webpack-assets.json`)
	// flow-disable-next-line: This type cannot be coerced to string
	const faviconsAssets = await getFile(`${basePath}/favicons-stats.json`)

	return {
		assets,
		faviconsAssets
	}
}
