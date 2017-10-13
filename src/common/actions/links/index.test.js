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
	type: GET_LINKS_PENDING
}

describe('USERS actions', () => {
	it('creates GET_LINKS_SUCCESS when GET_LINKS was successful', async done => {
		const store = mockStore({})
		const samplePayload = [
			{
				link: 'string',
				header: 'string'
			}
		]
		nock('https://github.com/Metnew')
			.get('/noir/*')
			.reply(200, samplePayload)

		return store.dispatch(GET_LINKS()).then(res => {
			const actions = store.getActions()
			const success = {
				type: GET_LINKS_SUCCESS,
				payload: samplePayload
			}
			const expectedActions = [pending, success]

			expect(actions).toMatchObject(expectedActions)
			done()
		})
	})

	xit('creates GET_LINKS_FAIL when GET_LINKS was unsuccessful', done => {
		const store = mockStore({})
		return store.dispatch(GET_LINKS(1)).then(res => {
			const actions = store.getActions()
			const fail = {
				type: GET_LINKS_FAIL,
				payload: {}
			}
			const expectedActions = [pending, fail]

			expect(actions).toEqual(expectedActions)
			done()
		})
	})
})
