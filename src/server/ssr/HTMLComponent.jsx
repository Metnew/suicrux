/// @flow
import serealize from 'serialize-javascript'
import _ from 'lodash'
type args = {
	// rendered to string application
	app: string,
	// Styled components' styles
	css: string,
	// react-async-component state
	asyncState: Object,
	// react-helmet
	helmet: Object,
	// redux preloaded state
	initialState: Object,
	// client assets manifest
	assets: Object,
	// prop for react-intl
	i18n: Object
}

const HTMLComponent = ({css, asyncState, initialState, assets, i18n, app, helmet}: args) => {
	const stringifiedAsyncState: string = serealize(asyncState)
	const stringifiedState: string = serealize(initialState)
	const stringifiedI18N: string = serealize(i18n)
	const wrapFuncs = {
		css: ({path}) => `<link rel="stylesheet" href="${path}" />`,
		js: ({path}) => `<script src="${path}" type="text/javascript"></script>`
	}
	const assetsOrdered = ['manifest', 'polyfills', 'vendor', 'client']
	const getTags = assets => funcs => ext => {
		// sort assets to be injected in right order
		// const assetsOrdered = ['manifest', 'vendor', 'client']
		return Object.keys(assets)
			.filter(bundleName => assets[bundleName][ext])
			.sort((a, b) => assetsOrdered.indexOf(a) - assetsOrdered.indexOf(b))
			.map(bundleName => {
				const path = assets[bundleName][ext]
				return funcs[ext]({path})
			})
			.join('')
	}
	const getTagsFromAssets = getTags(_.pick(assets, assetsOrdered))(wrapFuncs)
	const cssTags = getTagsFromAssets('css')
	const jsTags = getTagsFromAssets('js')

	return `<html ${helmet.htmlAttributes.toString()}>
			<head>
				${helmet.title.toString()}
				${helmet.meta.toString()}
				${helmet.base.toString()}
				${helmet.link.toString()}
				${helmet.noscript.toString()}

				${css}
				${cssTags}
			<head>
			<body>
			<script>window.__ASYNC_STATE__ = ${stringifiedAsyncState}</script>
			<script>window.__INITIAL_STATE__ = ${stringifiedState}</script>
			<script>window.__I18N__ = ${stringifiedI18N}</script>
			
			<div id="app">${app}</div>
			${jsTags}
			</body>
			</html>`
}

export default HTMLComponent
