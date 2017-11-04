import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
	UI_CLOSE_SIDEBAR,
	CLOSE_SIDEBAR,
	UI_OPEN_SIDEBAR,
	OPEN_SIDEBAR,
	UI_WINDOW_RESIZE,
	WINDOW_RESIZE
} from 'actions/layout'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Layout actions', () => {
	it('creates UI_CLOSE_SIDEBAR after CLOSE_SIDEBAR was dispatched', () => {
		const expectedAction = [{
			type: UI_CLOSE_SIDEBAR
		}]

		const store = mockStore({})
		store.dispatch(CLOSE_SIDEBAR())

		expect(store.getActions()).toEqual(expectedAction)
	})

	it('creates UI_OPEN_SIDEBAR after OPEN_SIDEBAR was dispatched', () => {
		const expectedAction = [{
			type: UI_OPEN_SIDEBAR
		}]

		const store = mockStore({})
		store.dispatch(OPEN_SIDEBAR())

		expect(store.getActions()).toEqual(expectedAction)
	})

	it('creates UI_WINDOW_RESIZE after WINDOW_RESIZE was dispatched', () => {
		const expectedAction = [{
			type: UI_WINDOW_RESIZE,
			payload: {
				innerWidth: 480
			}
		}]

		const store = mockStore({})
		store.dispatch(WINDOW_RESIZE(480))
		expect(store.getActions()).toEqual(expectedAction)
	})
})
