require('babel-core/register')
require.extensions['.scss'] = () => {
  return;
};
require.extensions['.css'] = () => {
  return;
};
global.window = {}
require('./server')
// SSR is under development, be patient :)
