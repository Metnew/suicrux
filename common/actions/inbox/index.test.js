/* eslint-disable */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from 'actions'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Inbox actions', () => {
  it('creates GET_INBOX_SUCCESS when GET_INBOX was successful', done => {
    const store = mockStore({})
    return store.dispatch(actions.GET_INBOX).then(res => {
      const { result } = res
      const expectedAction = {
        type: actions.GET_INBOX_SUCCESS,
        result
      }

      expect(res).toEqual(expectedAction)
      done()
    })
  })
})
