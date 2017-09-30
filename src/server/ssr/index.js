/**
 * @flow
 * @desc
 */
import React from 'react'
import chalk from 'chalk'
import {renderToNodeStream} from 'react-dom/server'
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'
import {configureRootComponent, configureApp} from 'common/app'
import HtmlComponent from './HtmlComponent'
// $FlowFixMe
import assets from 'webpack-assets'
// $FlowFixMe
import faviconsAssets from 'favicons-assets'
import getI18nData from 'server/i18n'

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
	const stream = renderToNodeStream(
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
		i18n
	}
	const {beforeAppTag, afterAppTag} = HtmlComponent(props)

	res.writeHead(200, {
		'Content-Type': 'text/html'
	})
	res.write(beforeAppTag)
	res.write(`<div id="app">`)
	stream.pipe(res, {end: false})

	stream.on('end', () => {
		res.write('</div>')
		res.write(afterAppTag)
		res.end()
	})
}
