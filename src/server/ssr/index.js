/**
 * @flow
 * @desc
 */
import React from 'react'
import {readFileSync, readFile} from 'fs'
import path from 'path'
import _ from 'lodash'
import {sync as globSync} from 'glob'
import {renderToString} from 'react-dom/server'
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'
import {configureRootComponent, configureApp} from 'common/app'
import {addLocaleData} from 'react-intl'
import HtmlComponent from './HtmlComponent'
import assets from 'webpack-assets'
import faviconsAssets from 'favicons-assets'

import type {Node} from 'react'

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

export default (req: express$Request, res: express$Response) => {
	const {isLoggedIn, token, lang} = req.user
	const initialState: Object = isLoggedIn
		? {me: {auth: {isLoggedIn, token}}}
		: {}
	const localeData = require('react-intl/locale-data/' + lang)
	const i18n = {
		lang,
		localeData,
		locale: lang,
		messages: translations[lang]
	}
	//
	const sheet = new ServerStyleSheet()
	const location: string = req.url
	const context = {}
	const {store, history, routes} = configureApp(initialState)
	const RootComponent: Node = configureRootComponent({
		store,
		history,
		routes,
		i18n,
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
		i18n,
		App
	}

	Object.keys(assets).map(key => {
		const bundle = assets[key]
		Object.keys(bundle).map(async filetype => {
			const filename = bundle[filetype]
			const isJS = filetype === 'js'
			const isCSS = filetype === 'css'

			var stream = res.push(filename, {
				status: 200, // optional
				method: 'GET', // optional
				request: {
					accept: '*/*'
				},
				response: {
					'content-type': isJS
						? 'application/javascript'
						: isCSS ? 'text/css' : 'text/html'
				}
			})

			const readFileAsync = path => {
				return new Promise((resolve, reject) => {
					try {
						readFile(path, (err, data) => {
							if (err) {
								reject(err)
							}
							resolve(data)
						})
					} catch (e) {
						reject(e)
					}
				})
			}

			const memoizedReadFileAsync = _.memoize(readFileAsync)
			const dataToStream = await memoizedReadFileAsync(
				`${process.env.CLIENT_DIST_PATH}/${filename}`
			)
			stream.end(dataToStream)
		})
	})

	const html: string = HtmlComponent(props)
	res.send(html)
}
