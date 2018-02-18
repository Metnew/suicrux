// @flow
import {
	GET_LINKS_FULFILLED,
	GET_LINKS_REJECTED,
	GET_LINKS_PENDING
} from 'actions/links'

export type State = {
	entities: any[],
	errors: Object,
	fetchStatus: 'none' | 'loaded' | 'loading' | 'error'
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
	case GET_LINKS_FULFILLED: {
		const entities = action.payload
		return {
			...state,
			entities,
			fetchStatus: 'loaded'
		}
	}
	case GET_LINKS_REJECTED: {
		const errors = action.payload
		return {
			...state,
			errors,
			fetchStatus: 'error'
		}
	}
	default:
		return state
	}
}
