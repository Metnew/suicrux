/**
 * @flow
 * @desc
 */
import React from 'react'
import {readFileSync} from 'fs'
import path from 'path'
import {sync as globSync} from 'glob'
import {renderToString} from 'react-dom/server'
import Helmet from 'react-helmet'
import createHistory from 'history/createMemoryHistory'
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'
import {configureRootComponent, configureApp} from 'common/app'
import IndexHTMLComponent from './IndexHTMLComponent'
import type {Node} from 'react'
import assets from 'webpack-assets'
import faviconsAssets from 'favicons-assets'

const translations = globSync('locals/*.json')
	.map(filename => [
		path.basename(filename, '.json'),
		readFileSync(filename, 'utf8')
	])
	.map(([locale, file]) => [locale, JSON.parse(file)])
	.reduce((collection, [locale, messages]) => {
		collection[locale] = messages
		return collection
	}, {})

export default (req: Object, res: Object, next: () => void) => {
	const {isLoggedIn, token, lang} = req.user
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
	const App: string = renderToString(
		<StyleSheetManager sheet={sheet.instance}>
			{RootComponent}
		</StyleSheetManager>
	)
	const css: string = sheet.getStyleTags()
	const preloadedState: Object = store.getState()
	const props = {
		css,
		assets,
		faviconsAssets,
		initialState: preloadedState,
		translation: translations[lang],
		App
	}
	const html: string = IndexHTMLComponent(props)
	res.send(html)
}
