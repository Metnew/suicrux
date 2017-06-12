import express from 'express'
import path from 'path'
import React from 'react'
import {renderToString} from 'react-dom/server'
// react-router
import {StaticRouter} from 'react-router'
// Application
import {configureStore, configureRootComponent} from '../common/index'
// const compression = require('compression')
// const Helmet = require('react-helmet')

const app = express()
const port = 8080

app.use(express.static(path.join(__dirname, 'dist')))
app.get('/', handleRender)

function handleRender (req, res) {
  const initialState = {auth: {loggedIn: true}}
  const context = {}
  const store = configureStore(initialState)
  const RootComponent = configureRootComponent(store)
  const App = (
    <StaticRouter url={req.url} context={context}>{RootComponent}</StaticRouter>
  )
  const html = renderToString(App)
  const finalState = store.getState()

  res.send(renderFullPage(html, finalState))
}

function renderFullPage (html, preloadedState) {
  return `<!doctype html>
    <html>
      <head>
        <link rel="./vendor.8cf514f2.css" />
        <link rel="./client.b0e1804f.css" />
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            '\\u003c'
          )}
        </script>
        <h1>SSR</h1>
        <script src="./vendor.8cf514f2.js"></script>
        <script src="./client.b0e1804f.js"></script>
      </body>
    </html>`
}

app.listen(port, () => {
  console.log(`SSR IS LISTENING ON PORT ${port}!`)
})
