// Import `auth` reducer and initialState for this
import {auth as reducer, initialState} from 'reducers/auth'
// Import all actions
import {
	LOGIN_AUTH_SUCCESS,
	LOGIN_AUTH_FAIL,
	LOGOUT_AUTH_SUCCESS
} from 'actions/auth'

describe('AUTH REDUCER', () => {
	// Does reducer return `initialState` on empty action type?
	it('should return the initial state', () => {
		expect(reducer(undefined, {x: 'string'})).toEqual(initialState)
	})

	const loggedInState = {
		...initialState,
		isLoggedIn: true
	}
	// Create test actions for our reducer.

	const logoutSuccess = {
		type: LOGOUT_AUTH_SUCCESS
	}

	it('should handle LOGOUT_AUTH_SUCCESS if already logged in', () => {
		// User is logged out after LOGOUT_AUTH_SUCCESS
		expect(reducer(loggedInState, logoutSuccess)).toEqual({
			...loggedInState,
			isLoggedIn: false
		})
	})

	it('should handle LOGIN_AUTH_FAIL if not logged in', () => {
		const action = {
			type: LOGIN_AUTH_FAIL,
			payload: {
				errors: {
					hello: 'world'
				}
			}
		}
		// User is logged out and has `errors` after LOGIN_AUTH_FAIL
		expect(reducer(initialState, action)).toEqual({
			...initialState,
			isLoggedIn: false
		})
	})

	it('should handle LOGIN_AUTH_SUCCESS if not logged in', () => {
		const action = {
			type: LOGIN_AUTH_SUCCESS,
			payload: {
				token: 'iamnotatoken'
			}
		}
		// User is logged in and has `token` after LOGIN_AUTH_SUCCESS
		expect(reducer(initialState, action)).toEqual({
			...initialState,
			isLoggedIn: true
		})
	})
})
