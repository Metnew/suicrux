// @flow
import {
	GET_LINKS_FULFILLED,
	GET_LINKS_PENDING
} from 'actions/links'

export type State = {
	entities: any[],
	errors: Object,
	fetchStatus: 'none' | 'loaded' | 'loading'
}

export const initialState: State = {
	entities: [],
	errors: {},
	fetchStatus: 'none'
}

export function links (state: State = initialState, action): State {
	switch (action.type) {
	case GET_LINKS_PENDING: {
		return {
			...state,
			errors: {},
			fetchStatus: 'loading'
		}
	}
<<<<<<< HEAD
	case GET_LINKS_SUCCESS: {
		const entities = action.payload
=======
	case GET_LINKS_FULFILLED: {
		const entities = action.payload.data
>>>>>>> feat/3.0-release
		return {
			...state,
			entities,
			fetchStatus: 'loaded'
<<<<<<< HEAD
		}
	}
	case GET_LINKS_FAIL: {
		const {errors} = action.payload
		return {
			...state,
			errors,
			fetchStatus: 'loaded'
=======
>>>>>>> feat/3.0-release
		}
	}
	default:
		return state
	}
}
