// @flow
// Redux stuff
import thunk from 'redux-thunk'
import {autoRehydrate} from 'redux-persist'
import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
// Application
import rootReducer from 'reducers'
import {routes, history} from 'routing'

/**
 * Configure application store with middlewares.
 * @param  {Object} initialState - preloadedState
 * @return {Object} - configured store
 */
const configureStore = (initialState: Object) => {
	const rehydrate = autoRehydrate()
	const middlewares = [thunk, routerMiddleware(history)]
	const appliedMiddlewares = middlewares.map(a => applyMiddleware(a))
	const enhancers = [rehydrate].concat(appliedMiddlewares)
	//
	const getComposeFunc = () => {
		if (process.env.NODE_ENV === 'development') {
			const {composeWithDevTools} = require('redux-devtools-extension')
			return composeWithDevTools
		}
		return compose
	}

	const composeFunc = getComposeFunc()
	const composedEnhancers = composeFunc.apply(null, enhancers)

	return createStore(rootReducer, initialState, composedEnhancers)
}

/**
 * Return configured history, routes and store for the app
 * @param  {Object} initialState
 * @return {Object} Object containting configured store, routes, history
 */
export default (initialState: Object) => {
	const store = configureStore(initialState)
	return {
		store,
		routes,
		history
	}
}
