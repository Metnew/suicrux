/* eslint-disable */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from 'actions'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Layout actions', () => {
	it('creates UI_CLOSE_SIDEBAR after CLOSE_SIDEBAR was dispatched', () => {
		const expectedAction = {
			type: actions.UI_CLOSE_SIDEBAR
		}

		const store = mockStore({})
		const result = store.dispatch(actions.CLOSE_SIDEBAR)

		expect(result).toEqual(expectedAction)
	})

	it('creates UI_OPEN_SIDEBAR after OPEN_SIDEBAR was dispatched', () => {
		const expectedAction = {
			type: actions.UI_OPEN_SIDEBAR
		}

		const store = mockStore({})
		const result = store.dispatch(actions.OPEN_SIDEBAR)

		expect(result).toEqual(expectedAction)
	})

	it('creates UI_WINDOW_RESIZE after WINDOW_RESIZE was dispatched', () => {
		const expectedAction = {
			type: actions.UI_WINDOW_RESIZE
		}

		const store = mockStore({})
		const result = store.dispatch(actions.WINDOW_RESIZE)
		expect(result).toEqual(expectedAction)
	})
})
