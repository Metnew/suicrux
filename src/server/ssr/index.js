import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
// React-related stuff
import React from 'react'
import {render} from 'rapscallion'
// import Helmet from 'react-helmet'
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'
// Application
import {configureStore, configureRootComponent} from 'common/index'
// read index.html and assign to a variable
const indexPath = path.join(`${process.env.DIST_PATH}/index.html`)
const htmlFile = (function () {
  try {
    return fs.readFileSync(indexPath, 'utf8')
  } catch (e) {
    console.error(chalk.bgRed(`Are you sure you have already built app? ${e}`))
    console.log(chalk.bgCyan('Application is working without SSR'))
    return false
  }
})()

export default function (req, res) {
  if (!htmlFile) {
    // NOTE: @Metnew (29.07.2017): Here must be a requirement of ejs/jade template
    // app probably needs in template engine!
    const warning = `
      <h1>Do you remember that you don't have SSR?</h1>
      <h2>Why it happens?</h2>
      <h3>Probably, because of:</h3>
      <h4>
        <ul>
          <li>No "index.html" in the dist folder. e.g.: You don't have already built app.</li>
          <li>Path to dist folder with client app is invalid, check process.env.DIST_PATH in "webpack_config/server/webpack.base."</li>
          <pre>process.env.path === ${process.env.DIST_PATH}</pre>
          <pre>URL: ${req.url}</pre>
        </ul>
      </h4>
    `
    return res.send(warning)
  }
  // Auth-related stuff
  // NOTE: check `server/express/index.js` for more info
  const {user} = req
  const {isLoggedIn, token} = user
  const initialState = isLoggedIn ? {me: {auth: {isLoggedIn, token}}} : {}
  //
  const sheet = new ServerStyleSheet()
  const location = req.url
  const context = {}
  const store = configureStore(initialState)
  const RootComponent = configureRootComponent({
    store,
    SSR: {location, context}
  })
  const App = (
    <StyleSheetManager sheet={sheet.instance}>
      {RootComponent}
    </StyleSheetManager>
  )
  //
  const css = sheet.getStyleTags()
  const preloadedState = store.getState()
  //
  render(App).toPromise().then(html => {
    res.send(renderFullPage({html, css, preloadedState}))
  })
}

function renderFullPage ({html, css, preloadedState}) {
  // console.log(indexHTMLFileContent)
  const htmlWithRedux = htmlFile.replace(
    '<div id="app"></div>',
    `<div id="app">${html}</div><script>
		window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
    /</g,
    '\\u003c'
  )}
	</script><span style="display:none;">Server-side rendering!</span>`
  )
  const styledHtmlWithRedux = htmlWithRedux.replace(
    '<meta name="ssr-styles"/>',
    css
  )
  return styledHtmlWithRedux
}
