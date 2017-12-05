// @flow
import {isLoggedIn as hasLocalToken} from 'api/LocalStorageCookiesSvc'
import {
	LOGIN_AUTH_FAIL,
	LOGIN_AUTH_SUCCESS,
	LOGOUT_AUTH_SUCCESS
} from 'actions/auth'
import {APPLICATION_INIT} from 'actions/common'

import type {
	LOGIN_AUTH_FAIL_TYPE,
	LOGIN_AUTH_SUCCESS_TYPE,
	LOGOUT_AUTH_SUCCESS_TYPE
} from 'actions/auth'
import type {APPLICATION_INIT_TYPE} from 'actions/common'

export type State = {
	isLoggedIn: boolean
}

type Action =
	| APPLICATION_INIT_TYPE
	| LOGIN_AUTH_FAIL_TYPE
	| LOGIN_AUTH_SUCCESS_TYPE
	| LOGOUT_AUTH_SUCCESS_TYPE

export const initialState: State = {
	isLoggedIn: hasLocalToken()
}

export function auth (state: State = initialState, action: Action): State {
	switch (action.type) {
	case APPLICATION_INIT:
		return {...initialState, ...state}
	case LOGOUT_AUTH_SUCCESS: {
		return {
			...state,
			isLoggedIn: false
		}
	}
	case LOGIN_AUTH_FAIL: {
		return {
			...state,
			isLoggedIn: false
		}
	}
	case LOGIN_AUTH_SUCCESS: {
		return {
			...state,
			isLoggedIn: true
		}
	}
	default:
		return state
	}
}
