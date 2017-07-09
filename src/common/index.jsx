import React from 'react'
// Redux stuff
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
// Application
import rootReducer from 'reducers'
import {Root} from 'components'
import {Routing, history} from 'routing'

/**
 * Configure application store with middlewares.
 * @param  {Object} initialState - preloadedState
 * @return {Object} - configured store
 */
export const configureStore = initialState => {
  let thunkApplied = applyMiddleware(thunk)
  let routerMiddlewareApplied = applyMiddleware(routerMiddleware(history))
  let enhancers

  if (process.env.NODE_ENV === 'development') {
    // FIXME: remove duplication
    const {composeWithDevTools} = require('redux-devtools-extension')
    enhancers = composeWithDevTools(thunkApplied, routerMiddlewareApplied)
  } else {
    enhancers = compose(thunkApplied, routerMiddlewareApplied)
  }

  return createStore(rootReducer, initialState, enhancers)
}
export const configureRootComponent = store => {
  const propsRoot = {
    routes: Routing,
    history,
    store
  }

  return <Root {...propsRoot} />
}
