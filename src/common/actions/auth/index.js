// @flow
import {awral} from 'actions/utils'
import {loginAPI} from 'api/AuthSvc'
import {setLocalToken, resetLocalToken} from 'api/LocalStorageCookiesSvc'

export const LOGIN_AUTH_SUCCESS = 'LOGIN_AUTH_SUCCESS'
export const LOGIN_AUTH_FAIL = 'LOGIN_AUTH_FAIL'

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

/**
  Awral is not recommended for production usage now
  But it can make your work with actions even simpler.
  NOTE: I strongly recommend you check Awral's sources!
  Awral is 910 bytes gzipped!
  {@link https://github.com/Metnew/awral}
*/
const awralLogin = awral.of({
	pending: null,
	success ({payload, dispatch}) {
		setLocalToken(payload.token)
		dispatch({type: LOGIN_AUTH_SUCCESS, payload})
	}
})

export const LOGIN_AUTH = awralLogin(loginAPI)('LOGIN_AUTH')

export const LOGOUT_AUTH = () => dispatch => {
	resetLocalToken()
	dispatch({type: LOGOUT_AUTH_SUCCESS})
}
