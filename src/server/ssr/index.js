/**
 * @flow
 * @desc
 */
import React, {type Node} from 'react'
import fs from 'fs'
import {renderToString} from 'react-dom/server'
import Helmet from 'react-helmet'
import createHistory from 'history/createMemoryHistory'
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'
import {configureApp, configureRootComponent} from 'common/app'
import IndexHTMLComponent from './IndexHTMLComponent'
import assets from 'webpack-assets'
import faviconsAssets from 'favicons-assets'

export default (req: Object, res: Object, next: () => void) => {
	const {isLoggedIn, token} = req.user
	const initialState: Object = isLoggedIn
		? {me: {auth: {isLoggedIn, token}}}
		: {}
	const sheet = new ServerStyleSheet()
	const location: string = req.url
	const context = {}
	const {store, history, routes} = configureApp(initialState)
	const RootComponent: Node = configureRootComponent({
		store,
		history,
		routes,
		SSR: {location, context}
	})
	const App: Node = (
		<StyleSheetManager sheet={sheet.instance}>
			{RootComponent}
		</StyleSheetManager>
	)
	const css = sheet.getStyleTags()
	const preloadedState: Object = store.getState()
	const props = {
		css,
		assets,
		faviconsAssets,
		initialState: preloadedState,
		App
	}
	const html: string = renderToString(<IndexHTMLComponent {...props} />)
	res.send(html)
}
