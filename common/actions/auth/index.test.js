import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from 'actions'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Auth actions', () => {

    // With Travic-ci we can test only actions that make requests to remote json APIs
    // You can uncomment tests below and test it locally

    it('cant be tested remotely', () => {
        expect(true).toEqual(true)
    })

    // it('creates LOGIN_AUTH_SUCCESS when LOGIN_AUTH was successful', () => {
    //     let result = {
    //         data: {
    //             token: 'string'
    //         }
    //     }
    //
    //     const expectedActions = [
    //         {
    //             type: actions.LOGIN_AUTH_SUCCESS,
    //             ...result.data
    //         }
    //     ]
    //
    //     const store = mockStore({})
    //     return store.dispatch(actions.LOGIN_AUTH({})).then(() => {
    //         let dispatched = store.getActions()
    //         expect(dispatched).toEqual(expectedActions)
    //     })
    // })

    // it('creates LOGIN_AUTH_FAIL when LOGIN_AUTH was failed', () => {
    //     let result = {
    //         data: {
    //             errors: ['array']
    //         }
    //     }
    //     const expectedActions = [
    //         {
    //             type: actions.LOGIN_AUTH_FAIL,
    //             ...result.data
    //         }
    //     ]
    //     const store = mockStore({})
    //     return store.dispatch(actions.LOGIN_AUTH({})).then((res) => {
    //         expect(store.getActions()).toEqual(expectedActions)
    //     })
    // })
})
