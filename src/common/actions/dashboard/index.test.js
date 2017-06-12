/* eslint-disable */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from 'actions'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Dashboard actions', () => {
  it('creates GET_STATISTICS_SUCCESS when GET_STATISTICS was successful', done => {
    const store = mockStore({})
    return store.dispatch(actions.GET_STATISTICS).then(res => {
      const { result } = res
      const expectedAction = {
        type: actions.GET_STATISTICS_SUCCESS,
        result
      }

      expect(res).toEqual(expectedAction)
      done()
    })
  })
})
