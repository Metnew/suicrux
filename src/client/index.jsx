// @flow
// Styles
// If you want full SUI CSS:
// import 'semantic-ui-css/semantic.css'
// If you want only some components from SUI:
import 'semantic-ui-css/components/button.css'
// import 'semantic-ui-css/components/card.css'
import 'semantic-ui-css/components/container.css'
import 'semantic-ui-css/components/dimmer.css'
import 'semantic-ui-css/components/divider.css'
import 'semantic-ui-css/components/grid.css'
import 'semantic-ui-css/components/header.css'
import 'semantic-ui-css/components/form.css'
import 'semantic-ui-css/components/icon.css'
import 'semantic-ui-css/components/image.css'
import 'semantic-ui-css/components/input.css'
import 'semantic-ui-css/components/menu.css'
import 'semantic-ui-css/components/label.css'
import 'semantic-ui-css/components/list.css'
import 'semantic-ui-css/components/loader.css'
import 'semantic-ui-css/components/reset.css'
import 'semantic-ui-css/components/sidebar.css'
import 'semantic-ui-css/components/site.css'
import 'semantic-ui-css/components/statistic.css'
// Polyfill for IE 11
// P.S: i don't know does starter works in IE 11
import 'promise-polyfill'
import 'isomorphic-fetch'
// Application
import React from 'react'
import {hydrate} from 'react-dom'
import {AsyncComponentProvider} from 'react-async-component'
import asyncBootstrapper from 'react-async-bootstrapper'
import {configureApp, configureRootComponent} from 'common/app'
import type {GlobalState} from 'reducers'
import type {i18nConfigObject} from 'types'

if (process.env.NODE_ENV === 'production') {
	require('common/pwa')
} else if (process.env.NODE_ENV === 'development') {
}

const initialState: GlobalState = window.__INITIAL_STATE__ || {}
const i18n: i18nConfigObject = window.__I18N__ || {}
const asyncState: Object = window.__ASYNC_STATE__ || {}
// NOTE: V8 doesn't optimize  `delete`
// delete window.__INITIAL_STATE__
const {store, routes, history} = configureApp(initialState)
const RootComponent = configureRootComponent({
	store,
	routes,
	history,
	i18n
})

const app = (
	<AsyncComponentProvider rehydrateState={asyncState}>
		{RootComponent}
	</AsyncComponentProvider>
)

asyncBootstrapper(app).then(() => {
	hydrate(app, document.getElementById('app'))
})

if (module.hot) {
	module.hot.accept()
}
