// @flow
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import type {State as AuthState} from 'reducers/auth'
import type {State as LayoutState} from 'reducers/layout'
import type {State as EntitiesLinksState} from 'reducers/links'

import {layout} from './layout'
import {links} from './links'
import {auth} from './auth'

// Root reducer
export default combineReducers({
	layout,
	me: combineReducers({auth}),
	entities: combineReducers({
		links
	}),
	routing: routerReducer
})

export type GlobalState = {layout: LayoutState} & {me: {auth: AuthState}} & {
		entities: {links: EntitiesLinksState}
	}
