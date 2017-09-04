// @flow
import {LOCATION_CHANGE} from 'actions/common'
import {
	GET_USERS_SUCCESS,
	GET_USERS_FAIL,
	GET_USERS_PENDING
} from 'actions/users'
import {normalizeArrayOfItems} from 'api/utils'
import type {LOCATION_CHANGE_TYPE} from 'actions/common'
import type {GET_USERS_SUCCESS_TYPE, GET_USERS_FAIL_TYPE, GET_USERS_PENDING_TYPE} from 'actions/users'

export type State = {
	entities: Object,
	errors: Object,
	isLoading: boolean,
	isLoaded: boolean,
	count: number
}

type Action =
	| LOCATION_CHANGE_TYPE
	| GET_USERS_SUCCESS_TYPE
	| GET_USERS_FAIL_TYPE
	| GET_USERS_PENDING_TYPE

export const initialState: State = {
	entities: {},
	errors: {},
	isLoading: false,
	isLoaded: false,
	count: 0
}

export function users (state: State = initialState, action: Action): State {
	switch (action.type) {
	case LOCATION_CHANGE: {
		// Return state if path matches /users
		// else initialState
		const {pathname} = action.payload
		if (/\/users/g.test(pathname)) {
			return state
		}
		return initialState
	}
	case GET_USERS_PENDING: {
		return {
			...state,
			errors: {},
			isLoaded: false,
			isLoading: true
		}
	}
	case GET_USERS_SUCCESS: {
		// @Metnew:
		// result may be an object, if it was request with params
		// `normalizeArrayOfItems` works only with arrays!
		const {count, entities} = normalizeArrayOfItems([action.payload])
		console.log(entities)
		return {
			...state,
			isLoaded: true,
			isLoading: false,
			entities,
			count
		}
	}
	case GET_USERS_FAIL: {
		const {errors} = action.payload
		return {
			...state,
			errors,
			isLoaded: true,
			isLoading: false
		}
	}
	default:
		return state
	}
}
