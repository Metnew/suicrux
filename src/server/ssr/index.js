/**
 * @flow
 * @desc
 */
import React from 'react'
<<<<<<< HEAD
import {renderToNodeStream} from 'react-dom/server'
=======
import {renderToString} from 'react-dom/server'
>>>>>>> feat/3.0-release
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'
import {configureRootComponent, configureApp} from 'common/app'
import asyncBootstrapper from 'react-async-bootstrapper'
import {AsyncComponentProvider, createAsyncContext} from 'react-async-component'
import HTMLComponent from './HTMLComponent'
import getI18nData from 'server/i18n'
import {matchPath} from 'react-router'
import {getRouterRoutes} from 'routing'
import getAssets from './stats'

export default async (req: express$Request, res: express$Response) => {
<<<<<<< HEAD
	// probably, it'd better to define these objs in global scope
	const {assets, faviconsAssets} = await getStats()
	const {isLoggedIn, language} = req.user
	const authState = {auth: {isLoggedIn}}
	const initialState: Object = {...authState}
=======
	const assets = await getAssets()
	const {language} = req.user
	const initialState: Object = {}
>>>>>>> feat/3.0-release
	const i18n = getI18nData(language)
	const sheet = new ServerStyleSheet()
	const location: string = req.url
	const context = {}
	const {store, history} = configureApp(initialState)
	const RootComponent: React$Node = configureRootComponent({
		store,
		history,
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

<<<<<<< HEAD
	// match url against browseable routes
=======
	const routes = getRouterRoutes()
>>>>>>> feat/3.0-release
	// if true - > throw 404, if match found -> 200
	const noRequestURLMatch = !routes.filter(r => !!r.path).find(r => matchPath(req.url, r))

	asyncBootstrapper(app).then(() => {
		const renderedApp = renderToString(app)
		const css: string = sheet.getStyleTags()
		const preloadedState: Object = store.getState()
		const responseStatusCode = noRequestURLMatch ? 404 : 200
		const asyncState = asyncContext.getState()
		const props = {
			css,
			assets,
			asyncState,
			initialState: preloadedState,
			app: renderedApp,
			i18n
		}

		res.status(responseStatusCode).send(HTMLComponent(props))
	})
}
