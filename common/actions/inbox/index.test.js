import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from 'actions'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Inbox actions', () => {

    it('creates GET_INBOX_SUCCESS when GET_INBOX was successful', () => {
        let result = {
            data: {
                token: 'string'
            }
        }

        const expectedActions = [
            {
                type: actions.GET_INBOX_SUCCESS,
                ...result.data
            }
        ]

        const store = mockStore({})
        return store.dispatch(actions.GET_INBOX).then(() => {
            let dispatched = store.getActions()
            expect(dispatched).toEqual(expectedActions)
        })
    })

    it('creates GET_INBOX_FAIL when GET_INBOX was failed', () => {
        let result = {
            data: {
                errors: ['array']
            }
        }
        const expectedActions = [
            {
                type: actions.GET_INBOX_FAIL,
                ...result.data
            }
        ]
        const store = mockStore({})
        return store.dispatch(actions.GET_INBOX).then((res) => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
