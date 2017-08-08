/* eslint-disable */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from 'actions'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('USERS actions', () => {
	it('creates GET_USERS_SUCCESS when GET_USERS was successful', done => {
		const store = mockStore({})
		// bind(null, null) - because we need somehow put args to a function
		return store.dispatch(actions.GET_USERS.bind(null, null)).then(res => {
			const {result} = res
			const expectedAction = {
				type: actions.GET_USERS_SUCCESS,
				result
			}

			expect(res).toEqual(expectedAction)
			done()
		})
	})
})
