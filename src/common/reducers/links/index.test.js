import {links as reducer, initialState} from 'reducers/links'
import {
	GET_LINKS_FULFILLED,
	GET_LINKS_PENDING
} from 'actions/links'

describe('LINKS REDUCER', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {x: 'string'})).toEqual(initialState)
	})

	it('should handle GET_LINKS_FULFILLED', () => {
		const success = {
			type: GET_LINKS_FULFILLED,
			payload: {
				data: [{item: 'payload'}],
				ok: false,
				status: 400
			}
		}
		expect(reducer(initialState, success)).toEqual({
			...initialState,
			entities: [{item: 'payload'}],
			fetchStatus: 'loaded'
		})
	})

	it('should handle GET_LINKS_PENDING', () => {
		const pending = {
			type: GET_LINKS_PENDING
		}
		expect(reducer(initialState, pending)).toEqual({
			...initialState,
			errors: {},
			fetchStatus: 'loading'
		})
	})
})
