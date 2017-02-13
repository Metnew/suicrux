const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const WebpackConfig = require('./webpack.config');
const open = require('open');

let server = new WebpackDevServer((webpack(WebpackConfig)), WebpackConfig.devServer)
server.listen(WebpackConfig.port, '0.0.0.0', (err) => {
    if (err) {
        console.log(err);
    }
    console.log('WebpackDevServer listening at 0.0.0.0:' + WebpackConfig.port);
    console.log('Opening your system browser...');
    open('http://localhost:' + WebpackConfig.port + '/webpack-dev-server/');
});
