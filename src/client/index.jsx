// import React from 'react'
import {render} from 'react-dom'
import {configureStore, configureRootComponent} from 'common'
// Styles
import 'semantic-ui-css/semantic.css'
import 'styles/index.scss'
// Performance and Devtools
// import {whyDidYouUpdate} from 'why-did-you-update'
import Perf from 'react-addons-perf'
import config from 'config'

window.BASE_API = config.BASE_API

if (process.env.NODE_ENV === 'production') {
  require('common/pwa')
} else if (process.env.NODE_ENV === 'development') {
  window.Perf = Perf
  // whyDidYouUpdate(React)
}

const preloadedState = window.__PRELOADED_STATE__ || {}
delete window.__PRELOADED_STATE__

const store = configureStore(preloadedState)
const RootComponent = configureRootComponent(store)
render(RootComponent, document.getElementById('app'))

if (module.hot) {
  module.hot.accept()
}
