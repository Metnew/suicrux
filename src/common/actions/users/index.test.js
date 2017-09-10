import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
	GET_USERS,
	GET_USERS_SUCCESS,
	GET_USERS_PENDING,
	GET_USERS_FAIL
} from 'actions/users'
import {getUsersAPI} from 'api/UsersSvc'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const pending = {
	type: GET_USERS_PENDING
}

describe('USERS actions', () => {
	it('creates GET_USERS_SUCCESS when GET_USERS was successful', async done => {
		const store = mockStore({})
		const apiResult = await getUsersAPI({id: 1})
		const samplePayload = apiResult.data
		return store.dispatch(GET_USERS(1)).then(res => {
			const actions = store.getActions()
			const success = {
				type: GET_USERS_SUCCESS,
				payload: samplePayload
			}
			const expectedActions = [pending, success]

			expect(actions).toMatchObject(expectedActions)
			done()
		})
	})

	xit('creates GET_USERS_FAIL when GET_USERS was unsuccessful', done => {
		const store = mockStore({})
		return store.dispatch(GET_USERS(1)).then(res => {
			const actions = store.getActions()
			const fail = {
				type: GET_USERS_FAIL,
				payload: {}
			}
			const expectedActions = [pending, fail]

			expect(actions).toEqual(expectedActions)
			done()
		})
	})
})
