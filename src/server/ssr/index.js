/**
 * @flow
 * @desc
 */
import React from 'react'
import _ from 'lodash'
import {renderToString} from 'react-dom/server'
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'
import {configureRootComponent, configureApp} from 'common/app'
import asyncBootstrapper from 'react-async-bootstrapper'
import {AsyncComponentProvider, createAsyncContext} from 'react-async-component'
import HTMLComponent from './HTMLComponent'
import getI18nData from 'server/i18n'
import {matchPath} from 'react-router'

export default async (req: express$Request, res: express$Response) => {
	const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)
	const {language} = req.user
	const initialState: Object = {}
	const i18n = getI18nData(language)
	const sheet = new ServerStyleSheet()
	const location: string = req.url
	const context = {}
	const {store, history, routes} = configureApp(initialState)
	const RootComponent: React$Node = configureRootComponent({
		store,
		routes,
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

	// if true - > throw 404, if match found -> 200
	const noRequestURLMatch = !_.find(routes, a => matchPath(req.url, a.path))

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
