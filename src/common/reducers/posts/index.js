// @flow
import {LOCATION_CHANGE} from 'actions/common'
import {
	GET_POSTS_SUCCESS,
	GET_POSTS_PENDING,
	GET_POSTS_FAIL
} from 'actions/posts'
import {normalizeArrayOfItems} from 'api/utils'
import type {
	GET_POSTS_FAIL_TYPE,
	GET_POSTS_SUCCESS_TYPE,
	GET_POSTS_PENDING_TYPE
} from 'actions/posts'

export type State = {
	entities: Object,
	errors: Object,
	isLoading: boolean,
	isLoaded: boolean,
	count: number
}

type Action =
	| GET_POSTS_FAIL_TYPE
	| GET_POSTS_SUCCESS_TYPE
	| GET_POSTS_PENDING_TYPE
	| GET_POSTS_FAIL_TYPE

export const initialState: State = {
	entities: {},
	errors: {},
	isLoading: false,
	isLoaded: false,
	count: 0
}

export function posts (state: State = initialState, action: Action): State {
	switch (action.type) {
	case LOCATION_CHANGE: {
		const {pathname} = action.payload
		if (pathname !== '/') {
			return initialState
		}
		return state
	}
	case GET_POSTS_PENDING: {
		return {
			...state,
			errors: {},
			isLoaded: false,
			isLoading: true
		}
	}
	case GET_POSTS_SUCCESS:
		const {payload} = action
		// @Metnew:
		// result may be an object, if it was request with params
		// `normalizeArrayOfItems` normalize only arrays of items!
		const {count, entities} = normalizeArrayOfItems([payload])
		return {
			isLoaded: true,
			isLoading: false,
			errors: {},
			count,
			entities
		}
	case GET_POSTS_FAIL:
		const {errors} = action.payload
		return {
			...state,
			isLoaded: true,
			isLoading: false,
			errors
		}
	default:
		return state
	}
}
