// @flow
// Redux stuff
import thunk from 'redux-thunk'
import {persistStore, persistCombineReducers} from 'redux-persist'
import storage from 'redux-persist/es/storage' // default: localStorage if web, AsyncStorage if react-native
import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
// // Application
import rootReducer from 'reducers'
import {history, routes} from 'routing'
//
/**
 * Configure application store
 * @param  {Object} initialState - preloadedState
 * @return {Object} - configured store
 */
const configureStore = (initialState: Object) => {
	const config = {
		key: 'root',
		storage
	}
	const persistReducer = persistCombineReducers(config, rootReducer)

	const middlewares = [thunk, routerMiddleware(history)]
	const enhancers = middlewares.map(a => applyMiddleware(a))

	const getComposeFunc = () => {
		if (process.env.NODE_ENV === 'development') {
			const {composeWithDevTools} = require('redux-devtools-extension')
			return composeWithDevTools
		}
		return compose
	}

	const composeFunc = getComposeFunc()
	const composedEnhancers = composeFunc.apply(null, enhancers)

	const store = createStore(persistReducer, initialState, composedEnhancers)
	const persistor = persistStore(store)

	return {
		store,
		persistor
	}
}

/**
 * Return configured history, routes and store
 * @param  {Object} initialState
 * @return {Object} Object containting configured store, routes, history
 */
export default (initialState: Object) => {
	const {store, persistor} = configureStore(initialState)
	return {
		store,
		persistor,
		routes,
		history
	}
}
