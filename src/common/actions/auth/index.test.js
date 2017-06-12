/* eslint-disable */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from 'actions'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Auth actions', () => {
  it('creates LOGIN_AUTH_SUCCESS when LOGIN_AUTH was successful', done => {
    const expectedActions = {
      type: actions.LOGIN_AUTH_SUCCESS,
      result: {
        token: 'nothing'
      }
    }

    const store = mockStore({})
    return store.dispatch(actions.LOGIN_AUTH({})).then(res => {
      expect(res).toEqual(expectedActions)
      done()
    })
  })

  // JSON DB should handle it too.
  // it('creates LOGIN_AUTH_FAIL when LOGIN_AUTH was failed', (done) => {
  //
  //     const expectedActions = {
  //         type: actions.LOGIN_AUTH_FAIL,
  //         error: {}
  //     }
  //
  //     const store = mockStore({})
  //     return store.dispatch(actions.LOGIN_AUTH({})).then((res) => {
  //         expect(res).toEqual(expectedActions)
  //         done()
  //     })
  // })
})
