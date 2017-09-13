// Styles
import 'semantic-ui-css/semantic.css'
// Fetch and promise polyfill
import 'promise-polyfill'
import 'isomorphic-fetch'
// Application
import {render} from 'react-dom'
import {configureApp, configureRootComponent} from 'common/app'
import {persistStore} from 'redux-persist'

if (process.env.NODE_ENV === 'production') {
	require('common/pwa')
} else if (process.env.NODE_ENV === 'development') {
	// Devtools
	// NOTE: whyDidYouUpdate package is temporary broken, waiting for a patch.

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
	/*eslint-enable */
	window.Perf = require('react-addons-perf')

	// NOTE: a11y doesnt work with SSR and React throws warnings like:
	// "React attempted to reuse markup in a container but the checksum was invalid"
	// a11y adds "id" attribute to the root container (#app) of your app and triggers re-rendering
	//
	/** {@link https://github.com/reactjs/react-a11y } */
	// const a11y = require('react-a11y')
	// a11y(React, {ReactDOM})
}

const initialState = window.__INITIAL_STATE__ || {}
const i18n = window.__I18N__ || {}
// NOTE: V8 doesn't optimize `delete`
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
