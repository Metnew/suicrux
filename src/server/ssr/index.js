/**
 * @flow
 * @desc
 */
import * as React from 'react'
import fs from 'fs'
import {renderToString} from 'react-dom/server'
import Helmet from 'react-helmet'
import createHistory from 'history/createMemoryHistory'
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'
import {configureApp, configureRootComponent} from 'common/app'

const DLLScripts =
	process.env.NODE_ENV === 'production'
		? ''
		: `
	<script src="/polyfills.js"></script>
	<script src="/vendor.js"></script>
`
// This function makes server rendering of asset references consistent with different webpack chunk/entry confiugrations
function normalizeAssets (assets) {
	return Array.isArray(assets) ? assets : [assets]
}

export default (req: Object, res: Object, next: () => void) => {
	const stats = fs.readFileSync(
		`${process.env.CLIENT_DIST_PATH}/stats.json`,
		'utf8'
	)
	const {isLoggedIn, token} = req.user
	const initialState: Object = isLoggedIn
		? {me: {auth: {isLoggedIn, token}}}
		: {}
	const sheet = new ServerStyleSheet()
	const location: string = req.url
	const context = {}
	const {store, history, routes} = configureApp({initialState})
	const RootComponent: React.Node = configureRootComponent({
		store,
		history,
		routes,
		SSR: {location, context}
	})
	const App: React.Node = (
		<StyleSheetManager sheet={sheet.instance}>
			{RootComponent}
		</StyleSheetManager>
	)
	const css = sheet.getStyleTags()
	const preloadedState: Object = store.getState()
	console.log(preloadedState)
	const app: string = renderToString(App)
	const {assetsByChunkName}: Object = JSON.parse(stats)
	const html = getHtml({
		app,
		css,
		initialState: preloadedState,
		assetsByChunkName
	})
	res.send(html)
}

/**
 * Get html
 * @param  {[type]} app               [description]
 * @param  {[type]} css               [description]
 * @param  {[type]} initialState      [description]
 * @param  {[type]} assetsByChunkName [description]
 * @return {String}                   [description]
 */
const getHtml = ({app, css, initialState, assetsByChunkName}) => {
	const stringifiedState: string = JSON.stringify(initialState)
	const safeStringifiedState: string = stringifiedState.replace(/</g, '\\u003c')
	return `
	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8">
			<title>Noir</title>
			<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	    <meta name="description" content="Production-ready, performance-first, template built with React/Redux/React-Semantic-UI">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
			<base href="/" />
			<meta name="theme-color" content="<%=htmlWebpackPlugin.options.theme_color%>"/>
	    <meta name="msapplication-tap-highlight" content="no">
			<link rel="manifest" href="manifest.json">
			${css}
			${normalizeAssets(assetsByChunkName.client)
		.filter(path => path.endsWith('.css'))
		.map(path => `<link rel="stylesheet" href="${path}" />`)
		.join('\n')}
		</head>
		<body>
			<div id="app">${app}</div>
			<script>window.__INITIAL_STATE__ = ${safeStringifiedState}</script>
			${DLLScripts}
			${normalizeAssets(assetsByChunkName.client)
		.filter(path => path.endsWith('.js'))
		.map(path => `<script src="${path}"></script>`)
		.join('\n')}
	<noscript>
		You are using outdated browser. You can install modern browser here: <a href="http://outdatedbrowser.com/" >http://outdatedbrowser.com</a>.
	</noscript>
		</body>
	</html>
	`
}
