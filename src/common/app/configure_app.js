// Redux stuff
import thunk from 'redux-thunk'
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
const configureStore = initialState => {
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

/**
 * Return configured history, routes and store for the app
 * @param  {Object} initialState
 * @return {Object} Object containting configured store, routes, history
 */
export default ({initialState}) => {
	const store = configureStore(initialState)
	return {
		store,
		routes,
		history
	}
}
