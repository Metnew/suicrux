import bodyParser from 'body-parser';
import path from 'path'
import Express from 'express'
import qs from 'qs'

// import webpack from 'webpack'
// import webpackDevMiddleware from 'webpack-dev-middleware'
// import webpackHotMiddleware from 'webpack-hot-middleware'
// import webpackConfig from '../webpack.config'

import React from 'react'
import {renderToString} from 'react-dom/server'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {RouterContext, match} from 'react-router';

// import configureStore from '../common/store/configureStore'
import App from '../common/containers/App/App'
import routes from '../common/routing'
import AppLogic from '../common/reducers'

const app = new Express()
const port = 9000
const store = createStore(AppLogic)

app.use(bodyParser.json());

// const compiler = webpack(webpackConfig)
// app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
// app.use(webpackHotMiddleware(compiler))

app.use((req, res) => {
    console.log('REQuest!!!')
    console.log(req.query.path)
    match({
        routes,
        location: req.query.path
    }, (error, redirectLocation, renderProps) => {

        if (error) {
            res.json(JSON.stringify({
				error: {
					type: err.constructor.name,
					message: err.message,
					stack: err.stack
				},
				markup: null
			}));
        } else if (redirectLocation) {
            res.json({
				path: redirectLocation.pathname + redirectLocation.search,
				redirect: true
			});
        } else if (renderProps) {
            // const content = renderToString();
            const content = renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps}/>
                </Provider>
            )
            res.json({
				error: null,
				markup: content
			});
        } else {
            res.json({
				error: {
                    type: 'Not found',
                    message: 'Not found',
                    code: 404
                },
				markup: null
			});
        }
    })
})

// window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}


app.listen(port, (error) => {
    if (error) {
        console.error(error)
    } else {
        console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
    }
})
