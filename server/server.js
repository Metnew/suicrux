import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom'
// react-router
// import createMemoryHistory from 'history/lib/createMemoryHistory'
// import {RoutingContext, match} from 'react-router'
// Application
import {configureStore, configureRootComponent} from './index'
// import {Root} from 'components'

const app = express()
const port = 8080

app.get(handleRender)

function handleRender (req, res) {
  // const params = qs.parse(req.query)
  // const counter = parseInt(params.counter, 10) || 0

  // Compile an initial state
  let initialState = {lol: 10}

  const store = configureStore(initialState)
  const RootComponent = configureRootComponent(store)

  const html = renderToString(<RootComponent />)

  const finalState = store.getState()

  res.send(renderFullPage(html, finalState))
}

function renderFullPage (html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port, () => {
  console.log(`> App is listening on ${port}.`)
})
