// Styles
import 'semantic-ui-css/semantic.css'
import 'styles/global'
// Application
import {render} from 'react-dom'
import {configureStore, configureRootComponent} from 'common/index.jsx'

if (process.env.NODE_ENV === 'production') {
  require('common/pwa')
} else if (process.env.NODE_ENV === 'development') {
  // Devtools
  // whyDidYouUpdate package is temporary broken, waiting for a patch
  // const {whyDidYouUpdate} = require('why-did-you-update')
  // whyDidYouUpdate(React)
  window.Perf = require('react-addons-perf')
}

const preloadedState = window.__PRELOADED_STATE__ || {}
delete window.__PRELOADED_STATE__

const store = configureStore(preloadedState)
const RootComponent = configureRootComponent(store)
render(RootComponent, document.getElementById('app'))

if (module.hot) {
  module.hot.accept()
}
