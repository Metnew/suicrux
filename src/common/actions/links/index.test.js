import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import nock from 'nock'
import {
	GET_LINKS,
	GET_LINKS_FULFILLED,
	GET_LINKS_PENDING
} from 'actions/links'

const middlewares = [thunk, promiseMiddleware()]
const mockStore = configureMockStore(middlewares)

describe('Links actions', () => {
	describe('GET_LINKS', () => {
		const pending = {
			type: GET_LINKS_PENDING
		}

		it('creates GET_LINKS_FULFILLED when GET_LINKS was successful', async done => {
			const store = mockStore({})
			const data = {
				link: 'string',
				header: 'string'
			}

			nock(/.*/)
				.get('/api/links')
				.reply(200, data)

			await store.dispatch(GET_LINKS())
			const actions = store.getActions()
			const success = {
				type: GET_LINKS_FULFILLED,
				payload: {
					ok: true,
					status: 200,
					data
				}
			}
			const expectedActions = [pending, success]

			expect(actions).toEqual(expectedActions)
			done()
		})
	})
})
