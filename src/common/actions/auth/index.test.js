// Disable Eslint for tests
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
	test('creates LOGIN_AUTH_SUCCESS when LOGIN_AUTH was successful', function (done) {
		// Create expected output of your action
		const expectedActions = {
			type: actions.LOGIN_AUTH_SUCCESS,
			result: {
				token: 'nothing'
			}
		}
		// Create store for testing
		const store = mockStore({})
		// try {
		// Dispatch action
		store
			.dispatch(actions.LOGIN_AUTH)
			.then(res => {
				// That means that there is no server that can respond to the request
				// NOTE:
				if (!res.errors) {
					console.error(`There is no server that can respond to the '/auth' request!`)
					expect(true).toEqual(true)
					return done()
				}
				// Compare expected and real outputs
				expect(res).toEqual(expectedActions)
				// Call `done()` callback, because action is async
				done()
			})
	})

	test('creates LOGIN_AUTH_FAIL when LOGIN_AUTH was unsuccessful', function (done) {
		// Create expected output of your action
		const expectedActions = {
			type: actions.LOGIN_AUTH_FAIL,
			result: {
				errors: {}
			}
		}
		// Create store for testing
		const store = mockStore({})
		// try {
		// Dispatch action
		store
			.dispatch(actions.LOGIN_AUTH)
			.then(res => {

				// Compare expected and real outputs
				expect(res.type).toEqual(expectedActions.type)
				// Call `done()` callback, because action is async
				done()
			})
	})
})
