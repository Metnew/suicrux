// @flow
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {reducer as reduxFormReducer} from 'redux-form'

import type {State as AuthState} from 'reducers/auth'
import type {State as LayoutState} from 'reducers/layout'
import type {State as EntitiesLinksState} from 'reducers/links'

import {layout} from './layout'
import {links} from './links'
import {auth} from './auth'

// Root reducer
export default combineReducers({
	layout,
	auth,
	entities: combineReducers({
		links
	}),
	routing: routerReducer,
	form: reduxFormReducer
})

export type GlobalState = {layout: LayoutState} & {auth: AuthState} & {
		entities: {links: EntitiesLinksState}
	}
