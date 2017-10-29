// @flow
import {awral} from 'actions/utils'
import {loginAPI} from 'api/AuthSvc'
import {setLocalToken, resetLocalToken} from 'api/LocalStorageCookiesSvc'

export const LOGIN_AUTH_PENDING = 'LOGIN_AUTH_PENDING'
export const LOGIN_AUTH_SUCCESS = 'LOGIN_AUTH_SUCCESS'
export const LOGIN_AUTH_FAIL = 'LOGIN_AUTH_FAIL'

export type LOGIN_AUTH_PENDING_TYPE = {type: 'LOGIN_AUTH_PENDING'}
export type LOGIN_AUTH_SUCCESS_TYPE = {
	type: 'LOGIN_AUTH_SUCCESS',
	payload: {token: string}
}
export type LOGIN_AUTH_FAIL_TYPE = {
	type: 'LOGIN_AUTH_FAIL',
	payload: {errors: Object}
}

export const LOGOUT_AUTH_SUCCESS = 'LOGOUT_AUTH_SUCCESS'
export type LOGOUT_AUTH_SUCCESS_TYPE = {type: 'LOGOUT_AUTH_SUCCESS'}

const awralLogin = awral.of({
	success ({payload, dispatch}) {
		setLocalToken(payload.token)
		dispatch({type: LOGIN_AUTH_SUCCESS, payload})
	}
})

export const LOGIN_AUTH = awralLogin(loginAPI)('LOGIN_AUTH')

export const LOGOUT_AUTH = () => {
	return dispatch => {
		resetLocalToken()
		dispatch({type: LOGOUT_AUTH_SUCCESS})
	}
}
