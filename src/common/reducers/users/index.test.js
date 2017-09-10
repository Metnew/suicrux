import {users as reducer, initialState} from 'reducers/users'
import {
	GET_USERS_FAIL,
	GET_USERS_SUCCESS,
	GET_USERS_PENDING
} from 'actions/users'
import {LOCATION_CHANGE} from 'actions/common'

const fail = {
	type: GET_USERS_FAIL,
	payload: {
		errors: {
			hmm: 'thatsanerror'
		}
	}
}

const sampleUserItem = {
	id: 1,
	name: 'Leanne Graham',
	username: 'Bret',
	email: 'Sincere@april.biz',
	address: {
		street: 'Kulas Light',
		suite: 'Apt. 556',
		city: 'Gwenborough',
		zipcode: '92998-3874',
		geo: {
			lat: '-37.3159',
			lng: '81.1496'
		}
	},
	phone: '1-770-736-8031 x56442',
	website: 'hildegard.org',
	company: {
		name: 'Romaguera-Crona',
		catchPhrase: 'Multi-layered client-server neural-net',
		bs: 'harness real-time e-markets'
	}
}

const success = {
	type: GET_USERS_SUCCESS,
	payload: sampleUserItem
}
const pending = {
	type: GET_USERS_PENDING
}

const locationChangeToInboxId = {
	type: LOCATION_CHANGE,
	payload: {
		pathname: '/users/1'
	}
}

const locationChangeDashboard = {
	type: LOCATION_CHANGE,
	payload: {
		pathname: '/'
	}
}

describe('USERS REDUCER', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {x: 'string'})).toEqual(initialState)
	})

	it('should handle GET_USERS_SUCCESS', () => {
		expect(reducer(initialState, success)).toEqual({
			...initialState,
			entities: {
				'1': sampleUserItem
			},
			count: 1,
			isLoaded: true,
			isLoading: false
		})
	})

	it('should handle GET_USERS_FAIL', () => {
		expect(reducer(initialState, fail)).toEqual({
			...initialState,
			errors: {
				hmm: 'thatsanerror'
			},
			isLoaded: true,
			isLoading: false
		})
	})

	it('should handle GET_USERS_PENDING', () => {
		expect(reducer(initialState, pending)).toEqual({
			...initialState,
			errors: {},
			isLoaded: false,
			isLoading: true
		})
	})

	it('should return same state if LOCATION_CHANGE navigates to /users/:id', () => {
		const customState = {
			...initialState,
			hello: 'world'
		}
		expect(reducer(customState, locationChangeToInboxId)).toEqual(customState)
	})

	it('should handle LOCATION_CHANGE to not /users path', () => {
		const customState = {
			...initialState,
			hello: 'world'
		}
		expect(reducer(customState, locationChangeDashboard)).toEqual(initialState)
	})
})
