// @flow
import {resultOK} from 'api/utils'
import {loginAPI} from 'api/AuthSvc'
import {setLocalToken, resetLocalToken} from 'api/LocalStorageCookiesSvc'
import type {LoginDataType} from 'api/AuthSvc'

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

export const LOGIN_AUTH = (data: LoginDataType) => {
	return async dispatch => {
		dispatch({type: LOGIN_AUTH_PENDING})
		const result = await loginAPI(data)
		if (!resultOK(result)) {
			dispatch({type: LOGIN_AUTH_FAIL, payload: result && result.data})
		} else {
			setLocalToken(result.data.token)
			dispatch({type: LOGIN_AUTH_SUCCESS, payload: result.data})
		}
	}
}

export const LOGOUT_AUTH = () => {
	return dispatch => {
		resetLocalToken()
		dispatch({type: LOGOUT_AUTH_SUCCESS})
	}
}
