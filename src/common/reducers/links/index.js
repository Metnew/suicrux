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
	isLoading: boolean,
	isLoaded: boolean
}

type Action =
	| GET_LINKS_SUCCESS_TYPE
	| GET_LINKS_FAIL_TYPE
	| GET_LINKS_PENDING_TYPE

export const initialState: State = {
	entities: [],
	errors: {},
	isLoading: false,
	isLoaded: false,
	count: 0
}

export function links (state: State = initialState, action: Action): State {
	switch (action.type) {
	case GET_LINKS_PENDING: {
		return {
			...state,
			errors: {},
			isLoaded: false,
			isLoading: true
		}
	}
	case GET_LINKS_SUCCESS: {
		const entities = action.payload
		const count = entities.length
		return {
			...state,
			isLoaded: true,
			isLoading: false,
			entities,
			count
		}
	}
	case GET_LINKS_FAIL: {
		const {errors} = action.payload
		return {
			...state,
			errors,
			isLoaded: true,
			isLoading: false,
			entities: [],
			count: 0
		}
	}
	default:
		return state
	}
}
