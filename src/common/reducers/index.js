// @flow
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import type {State as AuthState} from 'reducers/auth'
import type {State as LayoutState} from 'reducers/layout'
import type {State as EntitiesPostsState} from 'reducers/posts'
import type {State as EntitiesUsersState} from 'reducers/users'

import {layout} from './layout'
import {posts} from './posts'
import {users} from './users'
import {auth} from './auth'

// Root reducer
export default combineReducers({
	layout,
	me: combineReducers({auth}),
	entities: combineReducers({
		posts,
		users
	}),
	routing: routerReducer
})

export type GlobalState = {layout: LayoutState} & {me: {auth: AuthState}} & {
		entities: {posts: EntitiesPostsState, users: EntitiesUsersState}
	}
