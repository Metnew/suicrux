// Object.keys(assets).map(key => {
// 	const bundle = assets[key]
// 	Object.keys(bundle).map(async filetype => {
// 		const filename = bundle[filetype]
// 		const isJS = filetype === 'js'
// 		const isCSS = filetype === 'css'
//
// 		var stream = res.push(filename, {
// 			status: 200, // optional
// 			method: 'GET', // optional
// 			request: {
// 				accept: '*/*'
// 			},
// 			response: {
// 				'content-type': isJS
// 					? 'application/javascript'
// 					: isCSS ? 'text/css' : 'text/html'
// 			}
// 		})
//
// 		const readFileAsync = path => {
// 			return new Promise((resolve, reject) => {
// 				try {
// 					readFile(path, (err, data) => {
// 						if (err) {
// 							reject(err)
// 						}
// 						resolve(data)
// 					})
// 				} catch (e) {
// 					reject(e)
// 				}
// 			})
// 		}
//
// 		const memoizedReadFileAsync = _.memoize(readFileAsync)
// 		const dataToStream = await memoizedReadFileAsync(
// 			`${process.env.CLIENT_DIST_PATH}/${filename}`
// 		)
// 		stream.end(dataToStream)
// 	})
// })
