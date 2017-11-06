/**
 * @flow
 * @desc
 */
import React from 'react'
import chalk from 'chalk'
import _ from 'lodash'
import {renderToNodeStream} from 'react-dom/server'
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'
import {configureRootComponent, configureApp} from 'common/app'
import asyncBootstrapper from 'react-async-bootstrapper'
import {AsyncComponentProvider, createAsyncContext} from 'react-async-component'
import HTMLComponent from './HTMLComponent'
import getI18nData from 'server/i18n'
import {matchPath} from 'react-router'
import getStats from './stats'

// it's better to define these objs in global scope (less memory consumption)
let {assets, faviconsAssets} = {}
getStats().then(result => {
	assets = result.assets
	faviconsAssets = result.faviconsAssets
})

export default async (req: express$Request, res: express$Response) => {
	const {isLoggedIn, language} = req.user
	const {isMobile} = req.useragent
	console.log(chalk.cyan(`MOBILE DEVICE: ${isMobile}`))
	const meState = {auth: {isLoggedIn}}
	const layoutState = {isMobile}
	const initialState: Object = isLoggedIn
		? {me: meState, layout: layoutState}
		: {layout: layoutState}
	const i18n = getI18nData(language)
	const sheet = new ServerStyleSheet()
	const location: string = req.url
	const context = {}
	const {store, history, routes} = configureApp(initialState)
	const RootComponent: React$Node = configureRootComponent({
		store,
		history,
		routes,
		i18n,
		SSR: {location, context}
	})
	const asyncContext = createAsyncContext()

	const app = (
		<AsyncComponentProvider asyncContext={asyncContext}>
			<StyleSheetManager sheet={sheet.instance}>
				{RootComponent}
			</StyleSheetManager>
		</AsyncComponentProvider>
	)

	// if true - > throw 404, if match found -> 200
	const noRequestURLMatch = !_.find(routes, a => matchPath(req.url, a.path))

	asyncBootstrapper(app).then(() => {
		const appStream = renderToNodeStream(app)
		const css: string = sheet.getStyleTags()
		const preloadedState: Object = store.getState()
		const asyncState = asyncContext.getState()
		const props = {
			css,
			assets,
			faviconsAssets,
			asyncState,
			initialState: preloadedState,
			i18n
		}

		const {beforeAppTag, afterAppTag} = HTMLComponent(props)
		const responseStatusCode = noRequestURLMatch ? 404 : 200

		res.writeHead(responseStatusCode, {
			'Content-Type': 'text/html'
		})
		res.write(beforeAppTag)
		res.write(`<div id="app">`)
		appStream.pipe(res, {end: false})

		appStream.on('end', () => {
			res.write('</div>')
			res.write(afterAppTag)
			res.end()
		})
	})
}
