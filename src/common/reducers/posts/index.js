import {
	LOCATION_CHANGE,
	GET_POSTS_SUCCESS,
	GET_POSTS_PENDING,
	GET_POSTS_FAIL
} from 'actions'
import {normalizeArrayOfItems} from 'api/utils'

export const initialState = {
	entities: {},
	errors: {},
	fetchStatus: 'none',
	isLoading: false,
	isLoaded: false,
	count: 0
}

export function posts (state = initialState, action) {
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
			isLoading: true,
			fetchStatus: 'loading'
		}
	}
	case GET_POSTS_SUCCESS:
		const {result} = action
		// @Metnew:
		// result may be an object, if it was request with params
		// `normalizeArrayOfItems` normalize only arrays of items!
		const {count, entities} = normalizeArrayOfItems([result])
		return {
			isLoaded: true,
			isLoading: false,
			fetchStatus: 'loaded',
			errors: {},
			count,
			entities
		}
	case GET_POSTS_FAIL:
		return {
			...state,
			isLoaded: true,
			isLoading: false,
			fetchStatus: 'loaded',
			errors: action.errors
		}
	default:
		return state
	}
}
