/* eslint-disable */
// Import `auth` reducer and initialState for this
import {auth as reducer, initialState} from 'reducers/auth'
// Import all actions
import * as actions from 'actions'

describe('AUTH REDUCER', () => {
	// Does reducer return `initialState` on empty action type?
	it('should return the initial state', () => {
		expect(reducer(undefined, {x: 'string'})).toEqual(initialState)
	})

	// Create test actions for our reducer.

	const LOGOUT_AUTH_SUCCESS = {
		type: actions.LOGOUT_AUTH_SUCCESS
	}

	const LOGIN_AUTH_FAIL = {
		type: actions.LOGIN_AUTH_FAIL,
		errors: {
			hmmThatsAnError: {
				xxx: 1
			}
		}
	}

	const LOGIN_AUTH_SUCCESS = {
		type: actions.LOGIN_AUTH_SUCCESS,
		result: {
			token: 'iamnotatoken'
		}
	}

	it('should handle LOGOUT_AUTH_SUCCESS', () => {
		// User is logged out after LOGOUT_AUTH_SUCCESS
		expect(
			reducer(
				{
					...initialState,
					isLoggedIn: true,
					token: 'iamnotatoken'
				},
				LOGOUT_AUTH_SUCCESS
			)
		).toEqual({
			token: null,
			errors: {},
			isLoggedIn: false
		})
	})

	it('should handle LOGIN_AUTH_FAIL', () => {
		// User is logged out and has `errors` after LOGIN_AUTH_FAIL
		expect(reducer(initialState, LOGIN_AUTH_FAIL)).toEqual({
			...initialState,
			isLoggedIn: false,
			token: null,
			errors: {
				hmmThatsAnError: {
					xxx: 1
				}
			}
		})
	})

	it('should handle LOGIN_AUTH_SUCCESS', () => {
		// User is logged in and has `token` after LOGIN_AUTH_SUCCESS
		expect(reducer(initialState, LOGIN_AUTH_SUCCESS)).toEqual({
			...initialState,
			token: 'iamnotatoken',
			isLoggedIn: true
		})
	})
})
