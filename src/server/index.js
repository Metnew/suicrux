require('babel-core/register')
require.extensions['.scss'] = () => {}
require.extensions['.css'] = () => {}
global.window = {}
require('./server')
// SSR is under development, be patient :)
