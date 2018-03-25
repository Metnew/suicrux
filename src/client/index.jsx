// @flow
// Styles
// If you want full SUI CSS:
// import 'semantic-ui-css/semantic.css'
// If you want only some components from SUI:
import 'semantic-ui-css/components/button.css'
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
// babel polyfill (ie 10-11) + fetch polyfill
import 'babel-polyfill'
import 'isomorphic-fetch'
// Application
import React from 'react'
import {hydrate} from 'react-dom'
import {AsyncComponentProvider} from 'react-async-component'
import asyncBootstrapper from 'react-async-bootstrapper'
import {configureApp, configureRootComponent} from 'common/app'
import {AppContainer} from 'react-hot-loader'

if (process.env.NODE_ENV === 'production') {
	require('common/pwa')
}

const initialState = window.__INITIAL_STATE__ || {}
const i18n = window.__I18N__ || {}
const asyncState = window.__ASYNC_STATE__ || {}

const {store, routes, history} = configureApp(initialState)
const RootComponent = configureRootComponent({
	store,
	routes,
	history,
	i18n
})

const app = (
	<AppContainer warnings={false}>
		<AsyncComponentProvider rehydrateState={asyncState}>
			{RootComponent}
		</AsyncComponentProvider>
	</AppContainer>
)

asyncBootstrapper(app, false, { asyncBootstrapPhase: true }).then(() => {
	console.log('__INITIAL_STATE__:', initialState)
	hydrate(app, document.getElementById('app'))
})

if (module.hot) {
	module.hot.accept()
}
