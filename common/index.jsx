import React from 'react'
import {render} from 'react-dom'
// application styles
import 'styles/index.scss'
import 'semantic-ui-css/semantic.css'
// Redux
import {composeWithDevTools} from 'redux-devtools-extension'
import {whyDidYouUpdate} from 'why-did-you-update'
import Perf from 'react-addons-perf'
import {routerMiddleware} from 'react-router-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import {rootReducer} from './reducers'
import {Root} from 'components'
import {Routing, history} from './routing'
import config from 'config'

export const configureStore = (initialState) => {
    let middleware = applyMiddleware(routerMiddleware(history))
    let thunkApplied = applyMiddleware(thunk)

    if (process.env.NODE_ENV === 'development') {
        thunkApplied = composeWithDevTools(thunkApplied)
    }

    return createStore(rootReducer, thunkApplied, middleware, initialState)
}

export const configureRootComponent = (store) => {
    let propsRoot = {
        routes: Routing,
        history,
        store,
        key: Math.random()
    }

    return (<Root {...propsRoot}/>)
}


window.BASE_API = config.BASE_API

if (process.env.NODE_ENV === 'production') {
    require('./pwa')
} else if(process.env.NODE_ENV === 'development') {
    window.Perf = Perf
    whyDidYouUpdate(React)
}

const preloadedState = window.__PRELOADED_STATE__ || {}
delete window.__PRELOADED_STATE__

let store = configureStore(preloadedState)
let RootComponent = configureRootComponent(store)

render(RootComponent, document.getElementById('app'))

if (module.hot) {
    module.hot.accept()
}
