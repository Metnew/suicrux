import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import {
	GET_LINKS,
	GET_LINKS_SUCCESS,
	GET_LINKS_PENDING,
	GET_LINKS_FAIL
} from 'actions/links'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const pending = {
	meta: null,
	type: GET_LINKS_PENDING
}

describe('Links actions', () => {
	it('creates GET_LINKS_SUCCESS when GET_LINKS was successful', done => {
		const store = mockStore({})
		const samplePayload = [
			{
				link: 'string',
				header: 'string'
			}
		]
		nock('http://localhost:3000/api/v1')
			.get('/links')
			.reply(200, samplePayload)

		return store.dispatch(GET_LINKS()).then(res => {
			const actions = store.getActions()
			const success = {
				meta: null,
				type: GET_LINKS_SUCCESS,
				payload: samplePayload
			}
			const expectedActions = [pending, success]

			expect(actions).toEqual(expectedActions)
			done()
		})
	})

	it('creates GET_LINKS_FAIL when GET_LINKS was unsuccessful', async done => {
		const errorPayload = {errors: {}}
		nock('http://localhost:3000/api/v1')
			.get('/links')
			.reply(400, errorPayload)

		const store = mockStore({})
		await store.dispatch(GET_LINKS())
		const actions = store.getActions()
		const fail = {
			meta: null,
			type: GET_LINKS_FAIL,
			error: true,
			payload: errorPayload
		}
		const expectedActions = [pending, fail]

		expect(actions).toEqual(expectedActions)
		done()
	})
})
