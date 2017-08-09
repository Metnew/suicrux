// Disable Eslint for tests
/* eslint-disable */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
// Import all redux actions
import * as actions from 'actions'
// Add middlewares that our mock store will use
// It can be redux-thunk or routingMiddleware from `react-router-redux`
// Or any other middleware that you use in your app
const middlewares = [thunk]
// Create mockStore for testing
const mockStore = configureMockStore(middlewares)

describe('Auth actions', () => {
	/**
	 * @arg {Function} done - is a callback that you need to execute,
	 * If your action performing async task (e.g. request to API)
	 */
	it('creates LOGIN_AUTH_SUCCESS when LOGIN_AUTH was successful', done => {
		// Create expected output of your action
		const expectedActions = {
			type: actions.LOGIN_AUTH_SUCCESS,
			result: {
				token: 'nothing'
			}
		}
		// Create store for testing
		const store = mockStore({})
		// Dispatch action
		return store.dispatch(actions.LOGIN_AUTH).then(res => {
			// Compare expected and real outputs
			expect(res).toEqual(expectedActions)
			// Call `done()` callback, because action is async
			done()
		})
	})
})
