import path from 'path'
import fs from 'fs'
// React stuff
import React from 'react'
import {render} from 'rapscallion'
import Helmet from 'react-helmet'
import {StaticRouter} from 'react-router'
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'
// Application
import {configureStore, configureRootComponent} from 'common'
import {JWT_TOKEN} from 'api'
//
const language = process.env.APP_LANGUAGE || 'en'
const distPath = `../../../dist/${language}`
// read index.html and assign a variable
const indexPath = path.join(__dirname, `${distPath}/index.html`)
const indexHTMLFileContent = (function () {
  try {
    return fs.readFileSync(indexPath, 'utf8')
  } catch (e) {
    throw new Error(`Are you sure you have already built app? ${e}`)
  }
})()


export default function(req, res) {
  // Auth stuff
  const {cookies} = req
  const token = cookies[JWT_TOKEN]
  //
  //
  // HERE SHOULD BE CHECK THAT TOKEN IS VALID
  //
  //
  const isTokenValid = true
  const initialState = isTokenValid
    ? {me: {auth: {token, isLoggedIn: true}}}
    : {}
  //
  const sheet = new ServerStyleSheet()
  const context = {}
  const store = configureStore(initialState)
  const RootComponent = configureRootComponent(store)
  const App = (
    <StyleSheetManager sheet={sheet.instance}>
      <StaticRouter url={req.url} context={context}>
        {RootComponent}
      </StaticRouter>
    </StyleSheetManager>
  )
  //
  const css = sheet.getStyleTags()
  const preloadedState = store.getState()
  render(App).toPromise().then(html => {
    res.send(renderFullPage({html, css, preloadedState}))
  })
}

function renderFullPage ({html, css, preloadedState}) {
  // console.log(indexHTMLFileContent)
  const indexHTMLFileContentWithRedux = indexHTMLFileContent.replace(
    '<div id="app"></div>',
    `<div id="app">${html}</div><script>
		window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
    /</g,
    '\\u003c'
  )}
	</script><span style="display:none;">Server-side rendering!</span>`
  )
  const indexHTMLFileContentWithStylesAndRedux = indexHTMLFileContentWithRedux.replace(
    '<meta name="ssr-styles"/>',
    css
  )
  return indexHTMLFileContentWithStylesAndRedux
}
