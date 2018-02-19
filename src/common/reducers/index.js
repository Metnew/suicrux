// @flow
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import {layout} from './layout'
import {links} from './links'

// Root reducer
export default combineReducers({
	layout,
	entities: combineReducers({
		links
	}),
	routing: routerReducer
})
