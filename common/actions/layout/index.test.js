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
        return store.dispatch(actions.CLOSE_SIDEBAR).then((res) => {
            expect(res).toEqual(expectedAction)
        })
    })

    it('creates UI_OPEN_SIDEBAR after OPEN_SIDEBAR was dispatched', () => {
        const expectedAction = {
            type: actions.UI_OPEN_SIDEBAR
        }

        const store = mockStore({})
        return store.dispatch(actions.OPEN_SIDEBAR).then((res) => {
            expect(res).toEqual(expectedAction)
        })
    })

    it('creates UI_WINDOW_RESIZE after WINDOW_RESIZE was dispatched', () => {
        const expectedAction = {
            type: actions.UI_WINDOW_RESIZE
        }

        const store = mockStore({})
        return store.dispatch(actions.WINDOW_RESIZE).then((res) => {
            expect(res).toEqual(expectedAction)
        })
    })
})
