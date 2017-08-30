import React from 'react'
// Redux stuff
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
// Application
import rootReducer from 'reducers'
import {Root} from 'components'
import {routes, history} from 'routing'

/**
 * Configure application store with middlewares.
 * @param  {Object} initialState - preloadedState
 * @return {Object} - configured store
 */
export const configureStore = initialState => {
	const thunkApplied = applyMiddleware(thunk)
	const routerMiddlewareApplied = applyMiddleware(routerMiddleware(history))
	let enhancers

	if (process.env.NODE_ENV === 'development') {
		const {composeWithDevTools} = require('redux-devtools-extension')
		enhancers = composeWithDevTools(thunkApplied, routerMiddlewareApplied)
	} else {
		enhancers = compose(thunkApplied, routerMiddlewareApplied)
	}

	return createStore(rootReducer, initialState, enhancers)
}
/* eslint-disable */
export const configureRootComponent = ({store, SSR}) => {
  // stupid eslint thinks that if function returns JSX, than it's a component
  // "Eslint, I don't want a component, I want a function!"
  const propsRoot = {
    routes,
    history,
    store,
    SSR
  }

  return <Root {...propsRoot} />
}
/* eslint-enable */
