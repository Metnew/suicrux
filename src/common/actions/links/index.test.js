import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import {
	GET_LINKS,
	GET_LINKS_FULFILLED,
	GET_LINKS_PENDING,
	GET_LINKS_REJECTED
} from 'actions/links'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Links actions', () => {
	describe('GET_LINKS', () => {
		const pending = {
			meta: null,
			type: GET_LINKS_PENDING
		}

		it('creates GET_LINKS_FULFILLED when GET_LINKS was successful', done => {
			const store = mockStore({})
			const payload = [
				{
					link: 'string',
					header: 'string'
				}
			]

			nock(/.*/)
				.get('/links')
				.reply(200, payload)

			return store.dispatch(GET_LINKS()).then(res => {
				const actions = store.getActions()
				const success = {
					meta: null,
					type: GET_LINKS_FULFILLED,
					payload
				}
				const expectedActions = [pending, success]

				expect(actions).toEqual(expectedActions)
				done()
			})
		})

		it('creates GET_LINKS_REJECTED when GET_LINKS was unsuccessful', async done => {
			const payload = {errors: {}}
			nock(/.*/)
				.get('/links')
				.reply(400, payload)

			const store = mockStore({})
			await store.dispatch(GET_LINKS())
			const actions = store.getActions()
			const fail = {
				meta: null,
				type: GET_LINKS_REJECTED,
				error: true,
				payload
			}
			const expectedActions = [pending, fail]

			expect(actions).toEqual(expectedActions)
			done()
		})
	})
})
