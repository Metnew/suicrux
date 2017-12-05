import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
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

describe('Auth actions', () => {
	describe('LOGIN_AUTH', () => {
		test('creates LOGIN_AUTH_SUCCESS when LOGIN_AUTH was successful', done => {
			const successPayload = {
				token: 'nothing'
			}

			nock(process.env.BASE_API)
				.post('/auth')
				.reply(200, successPayload)
			// Create expected output of your action
			const expectedActions = [
				{
					type: LOGIN_AUTH_SUCCESS,
					payload: successPayload
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

		test('creates LOGIN_AUTH_FAIL when LOGIN_AUTH was unsuccessful', done => {
			// Create expected output of your action
			const errorPayload = {
				errors: {}
			}

			const expectedActions = [
				{
					type: LOGIN_AUTH_FAIL,
					error: true,
					meta: null,
					payload: errorPayload
				}
			]

			nock(process.env.BASE_API)
				.post('/auth')
				.reply(400, errorPayload)
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
	})

	describe('LOGOUT_AUTH', () => {
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
})
