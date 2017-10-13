import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
// Import all redux actions
import {
	LOGIN_AUTH_SUCCESS,
	LOGIN_AUTH_FAIL,
	LOGIN_AUTH_PENDING,
	LOGIN_AUTH,
	LOGOUT_AUTH_SUCCESS,
	LOGOUT_AUTH
} from 'actions/auth'
// Add middlewares that our mock store will use
// It can be redux-thunk or routingMiddleware from `react-router-redux`
// Or any other middleware that you use in your app
const middlewares = [thunk]
// Create mockStore for testing
const mockStore = configureMockStore(middlewares)

const loginPending = {
	type: LOGIN_AUTH_PENDING
}

describe('Auth actions', () => {
	/**
	 * @arg {Function} done - is a callback that you need to execute,
	 * If your action performing async task (e.g. request to API)
	 */
	xtest('creates LOGIN_AUTH_SUCCESS when LOGIN_AUTH was successful', done => {
		// Create expected output of your action
		const expectedActions = [
			loginPending,
			{
				type: LOGIN_AUTH_SUCCESS,
				payload: {
					token: 'nothing'
				}
			}
		]
		// Create store for testing
		const store = mockStore({})
		// Dispatch action
		store.dispatch(LOGIN_AUTH()).then(() => {
			// Compare expected and real outputs
			expect(store.getActions()).toEqual(expectedActions)
			// Call `done()` callback, because action is async
			done()
		})
	})

	xtest('creates LOGIN_AUTH_FAIL when LOGIN_AUTH was unsuccessful', done => {
		// Create expected output of your action
		const expectedActions = [
			loginPending,
			{
				type: LOGIN_AUTH_FAIL,
				payload: {
					errors: {}
				}
			}
		]
		// Create store for testing
		const store = mockStore({})
		// Dispatch action
		store.dispatch(LOGIN_AUTH()).then(res => {
			// Compare expected and real outputs
			expect(store.getActions()).toEqual(expectedActions)
			// Call `done()`, because test is async
			done()
		})
	})

	test('creates LOGOUT_AUTH_SUCCESS on LOGOUT_AUTH', () => {
		// Create expected output of your action
		const expectedActions = [
			{
				type: LOGOUT_AUTH_SUCCESS
			}
		]
		// Create store for testing
		const store = mockStore({})
		// Dispatch action
		store.dispatch(LOGOUT_AUTH())
		// Compare expected and real outputs
		expect(store.getActions()).toEqual(expectedActions)
	})
})
