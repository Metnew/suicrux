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
	case GET_LINKS_FULFILLED: {
		const entities = action.payload.data
		return {
			...state,
			entities,
			fetchStatus: 'loaded'
		}
	}
	default:
		return state
	}
}
