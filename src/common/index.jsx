import React from 'react'
// Devtools
import {composeWithDevTools} from 'redux-devtools-extension'
// Redux stuff
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
// Application
import {rootReducer} from 'reducers'
import {Root} from 'components'
import {Routing, history} from 'routing'

export const configureStore = initialState => {
  const routerMiddlewareApplied = applyMiddleware(routerMiddleware(history))
  const thunkApplied = applyMiddleware(thunk)
  let middlewares = null

  if (process.env.NODE_ENV === 'development') {
    middlewares = composeWithDevTools(routerMiddlewareApplied, thunkApplied)
  } else {
    middlewares = compose(routerMiddlewareApplied, thunkApplied)
  }

  return createStore(rootReducer, initialState, middlewares)
}

export const configureRootComponent = store => {
  const propsRoot = {
    routes: Routing,
    history,
    store
  }

  return <Root {...propsRoot} />
}
