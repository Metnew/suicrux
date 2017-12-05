// @flow
import {
	GET_LINKS_SUCCESS,
	GET_LINKS_FAIL,
	GET_LINKS_PENDING
} from 'actions/links'
import type {LinkItem} from 'types'
import type {GET_LINKS_SUCCESS_TYPE, GET_LINKS_FAIL_TYPE, GET_LINKS_PENDING_TYPE} from 'actions/links'

export type State = {
	entities: Array<LinkItem>,
	errors: Object,
	fetchStatus: 'none' | 'loaded' | 'loading'
}

type Action =
	| GET_LINKS_SUCCESS_TYPE
	| GET_LINKS_FAIL_TYPE
	| GET_LINKS_PENDING_TYPE

export const initialState: State = {
	entities: [],
	errors: {},
	fetchStatus: 'none'
}

export function links (state: State = initialState, action: Action): State {
	switch (action.type) {
	case GET_LINKS_PENDING: {
		return {
			...state,
			errors: {},
			fetchStatus: 'loading'
		}
	}
	case GET_LINKS_SUCCESS: {
		const entities = action.payload
		return {
			...state,
			entities,
			fetchStatus: 'loaded'
		}
	}
	case GET_LINKS_FAIL: {
		const {errors} = action.payload
		return {
			...state,
			errors,
			fetchStatus: 'loaded'
		}
	}
	default:
		return state
	}
}
