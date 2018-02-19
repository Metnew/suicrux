// @flow
import fs from 'fs'
import chokidar from 'chokidar'

let cache = {}
// NOTE: Razzle could `require` CLIENT_ASSETS_MANIFEST
// In SUIcrux it's currently not possible :(
// Server requires "missing module"
// Probably, because CLIENT_ASSETS_MANIFEST isn't ready while it's required
// So, we read file (only on first request) instead of importing it
async function getFile (path) {
	// Cache file
	if (cache[path]) {
		return cache[path]
	}

	return new Promise((resolve, reject) => {
		const watcher = chokidar.watch(path)

		// This `readFile` func is looking like it escaped from procedure programming
		const readFile = () => {
			fs.readFile(path, 'utf8', (err, data) => {
				if (err) {
					throw err
				}
				const json = JSON.parse(data)
				cache[path] = json
				watcher.close()
				resolve(json)
			})
		}
		// does file exist?
		fs.access(path, fs.constants.R_OK, err => {
			if (err) {
				// No. Watch for changes, resolve on `add`.
				watcher.on('add', readFile)
			} else {
				// Yes. resolve!
				readFile()
			}
		})
	})
}

export default async function () {
	// flow-disable-next-line: This type cannot be coerced to string
	const assets = await getFile(process.env.CLIENT_ASSETS_MANIFEST)
	// AutoDLL assets aren't included in CLIENT_ASSET_MANIFEST (webpack stats)
	// So they are hardcoded here
	const AutoDLLDevOnly =
		process.env.NODE_ENV === 'development'
			? {
				vendor: {
					js: 'http://localhost:3000/vendor.js'
				},
				polyfills: {
					js: 'http://localhost:3000/polyfills.js'
				}
			}
			: {}

	return {
		...assets,
		...AutoDLLDevOnly
	}
}
