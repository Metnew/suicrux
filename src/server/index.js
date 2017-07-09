require('babel-core/register')
// NOTE: uncomment these lines below if you use scss/sass!
// require.extensions['.scss'] = () => {}
// require.extensions['.css'] = () => {}
global.window = {
	addEventListener: () => {}
}
global.i18n = () => {}
global.fetch = require('node-fetch')
require('./server')
// SSR is under development, be patient :)
