require('babel-core/register')
// require.extensions['.scss'] = () => {}
// require.extensions['.css'] = () => {}
global.window = {}
console.log('It\'s still under development. Do not try to use!')
require('./server')
// SSR is under development, be patient :)
