require('babel-core/register')
// NOTE: uncomment these lines below if you use scss/sass!
// require.extensions['.scss'] = () => {}
// require.extensions['.css'] = () => {}
global.window = {
	addEventListener: () => {}
}
const {BASE_API, PORT} = process.env
process.env.BASE_API = BASE_API ? BASE_API : '/api/v1'
process.env.PORT = PORT ? PORT : 4000
global.i18n = () => {}
global.fetch = require('node-fetch')
require('./server')
