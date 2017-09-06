// @flow
import React, {Component} from 'react'
import type {Node} from 'react'
type Props = {
	css: string,
	App: Node,
	initialState: Object,
	assets: Object,
	faviconsAssets: Object
}

const DLLScripts =
	process.env.NODE_ENV === 'production'
		? ''
		: `
	<script src="/polyfills.js"></script>
	<script src="/vendor.js"></script>
`

const IndexHTMLComponent = ({css, App, initialState, assets, faviconsAssets}: Props) => {
	const stringifiedState: string = JSON.stringify(initialState)
	const safeStringifiedState: string = stringifiedState.replace(/</g, '\\u003c')

	const createBody = () => {
		const __html = `<div id="app">
			<App />
		</div>
		<script>window.__INITIAL_STATE__ = ${safeStringifiedState}</script>
		${DLLScripts}
		${Object.keys(assets)
		.filter(bundleName => assets[bundleName].js)
		.map(bundleName => {
			const path = assets[bundleName].js
			return `<script src="${path}" type="text/javascript"></script>`
		})
		.join('')}
		<noscript>
			You are using outdated browser. You can install modern browser here:{' '}
			<a href="http://outdatedbrowser.com/">http://outdatedbrowser.com</a>.
		</noscript>`
		return {__html}
	}

	const createHead = () => {
		const __html = `<meta charSet="utf-8" />
		<title>Noir</title>
		<meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta
			name="description"
			content="Advanced universal React starter built with a scale in mind."
		/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<base href="/" />
		
		<meta name="msapplication-tap-highlight" content="no" />
		<link rel="manifest" href="manifest.json" />
		${faviconsAssets.html.join('')}
		${css}
		${Object.keys(assets)
		.filter(bundleName => assets[bundleName].css)
		.map(bundleName => {
			const path = assets[bundleName].css
			return `<link rel="stylesheet" href="${path}" />`
		})
		.join('')}`
		return {__html}
	}

	return (
		<html lang="en">
			<head dangerouslySetInnerHTML={createHead()} />
			<body dangerouslySetInnerHTML={createBody()} />
		</html>
	)
}

export default IndexHTMLComponent

// брать статс метить лейзи чанки к роутам и отдавать лишь эти чанки
