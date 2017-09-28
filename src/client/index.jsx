// @flow
// Styles
// If you want full SUI CSS:
// import 'semantic-ui-css/semantic.css'
// If you want only some components from SUI:
import 'semantic-ui-css/components/button.css'
import 'semantic-ui-css/components/card.css'
import 'semantic-ui-css/components/container.css'
import 'semantic-ui-css/components/dimmer.css'
import 'semantic-ui-css/components/divider.css'
import 'semantic-ui-css/components/dropdown.css'
import 'semantic-ui-css/components/grid.css'
import 'semantic-ui-css/components/header.css'
import 'semantic-ui-css/components/flag.css'
import 'semantic-ui-css/components/form.css'
import 'semantic-ui-css/components/item.css'
import 'semantic-ui-css/components/icon.css'
import 'semantic-ui-css/components/image.css'
import 'semantic-ui-css/components/input.css'
import 'semantic-ui-css/components/menu.css'
import 'semantic-ui-css/components/label.css'
import 'semantic-ui-css/components/loader.css'
import 'semantic-ui-css/components/reset.css'
import 'semantic-ui-css/components/sidebar.css'
import 'semantic-ui-css/components/site.css'
import 'semantic-ui-css/components/statistic.css'
// promise polyfill
import 'promise-polyfill'
// Application
import {render} from 'react-dom'
import {configureApp, configureRootComponent} from 'common/app'
import {persistStore} from 'redux-persist'
import type {GlobalState} from 'reducers'
import type {i18nConfigObject} from 'types'

if (process.env.NODE_ENV === 'production') {
	require('common/pwa')
} else if (process.env.NODE_ENV === 'development') {
	// Devtools
	// NOTE: whyDidYouUpdate package is temporarily broken, waiting for a patch.
	/*eslint-disable */
	// NOTE: But if you really want to run `why-did-you-update`
	// You can uncomment this block:
	/*
    Object.defineProperty(React, 'createClass', {
      set: nextCreateClass => {
        createClass = nextCreateClass
      }
    })

   const {whyDidYouUpdate} = require('why-did-you-update')
    whyDidYouUpdate(React)
  */
	/* eslint-enable */
	// window.Perf = require('react-addons-perf')
	// NOTE: a11y doesnt work with SSR and React throws warnings like:
	// "React attempted to reuse markup in a container but the checksum was invalid"
	// a11y adds "id" attribute to the root container (#app) of app and triggers re-rendering
	//
	/** {@link https://github.com/reactjs/react-a11y } */
	// const a11y = require('react-a11y')
	// a11y(React, {ReactDOM})
}

const initialState: GlobalState = window.__INITIAL_STATE__ || {}
const i18n: i18nConfigObject = window.__I18N__ || {}
// NOTE: V8 doesn't optimize code with `delete`
// delete window.__INITIAL_STATE__
const {store, routes, history} = configureApp(initialState)
const RootComponent = configureRootComponent({
	store,
	routes,
	history,
	i18n
})

render(RootComponent, document.getElementById('app'))

persistStore(store)

if (module.hot) {
	module.hot.accept()
}
