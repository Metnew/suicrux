/* eslint-disable */
import {users as reducer, initialState} from 'reducers/users'
import * as actions from 'actions'

const GET_USERS_FAIL = {
	type: actions.GET_USERS_FAIL,
	errors: {
		hmm: 'thatsanerror'
	}
}
const GET_USERS_SUCCESS = {
	type: actions.GET_USERS_SUCCESS,
	result: [{id: 1, something: 'strange'}]
}
const GET_USERS_PENDING = {
	type: actions.GET_USERS_PENDING
}

const LOCATION_CHANGE_INBOX_ID = {
	type: actions.LOCATION_CHANGE,
	payload: {
		pathname: '/inbox/1'
	}
}

describe('USERS REDUCER', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {x: 'string'})).toEqual(initialState)
	})

	it('should handle GET_USERS_SUCCESS', () => {
		expect(reducer(initialState, GET_USERS_SUCCESS)).toEqual({
			...initialState,
			entities: {
				'1': {
					id: 1,
					something: 'strange'
				}
			},
			count: 1,
			isLoaded: true,
			isLoading: false,
			fetchStatus: 'loaded'
		})
	})

	it('should handle GET_USERS_FAIL', () => {
		expect(reducer(initialState, GET_USERS_FAIL)).toEqual({
			...initialState,
			errors: {
				hmm: 'thatsanerror'
			},
			isLoaded: true,
			isLoading: false,
			fetchStatus: 'loaded'
		})
	})

	it('should handle GET_USERS_PENDING', () => {
		expect(reducer(initialState, GET_USERS_PENDING)).toEqual({
			...initialState,
			errors: {},
			isLoaded: false,
			isLoading: true,
			fetchStatus: 'loading'
		})
	})

	it('should return same state if LOCATION_CHANGE navigates to inbox/:id route', () => {
		expect(reducer(initialState, LOCATION_CHANGE_INBOX_ID)).toEqual(
			initialState
		)
	})
})
