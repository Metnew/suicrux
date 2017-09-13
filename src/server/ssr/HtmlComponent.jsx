// @flow
type args = {
	css: string,
	App: string,
	initialState: Object,
	assets: Object,
	faviconsAssets: Object,
	i18n: Object
}
// renderToString
const DLLScripts =
	process.env.NODE_ENV === 'production'
		? ''
		: `
	<script src="/polyfills.js"></script>
	<script src="/vendor.js"></script>
`

const HtmlComponent = ({
	css,
	App,
	initialState,
	assets,
	faviconsAssets,
	i18n
}: args) => {
	const stringifiedState: string = JSON.stringify(initialState)
	const stringifiedI18N: string = JSON.stringify(i18n)
	const safeStringifiedState: string = stringifiedState.replace(/</g, '\\u003c')

	const createBody = () => {
		const html = `
			<div id="app">${App}</div>
		<script>window.__INITIAL_STATE__ = ${safeStringifiedState}</script>
		<script>window.__I18N__ = ${stringifiedI18N}</script>
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
		return html
	}

	const createHead = () => {
		const html = `
			<meta charset="utf-8" />
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
		${faviconsAssets.html && faviconsAssets.html.join('')}
		${css}
		${Object.keys(assets)
		.filter(bundleName => assets[bundleName].css)
		.map(bundleName => {
			const path = assets[bundleName].css
			return `<link rel="stylesheet" href="${path}" />`
		})
		.join('')}`
		return html
	}

	return `<html lang="${i18n.lang}">
			<head>${createHead()}<head>
			<body>
				${createBody()}
			</body>
		</html>`
}

export default HtmlComponent
