require('babel-register')
require.extensions['.scss'] = () => {
  return;
};
require.extensions['.css'] = () => {
  return;
};
require('./server')
