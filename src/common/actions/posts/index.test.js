/* eslint-disable */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from 'actions'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('POSTS actions', () => {
	it('creates GET_POSTS_SUCCESS when GET_POSTS was successful', done => {
		const store = mockStore({})
		return store.dispatch(actions.GET_POSTS).then(res => {
			const {result} = res
			const expectedAction = {
				type: actions.GET_POSTS_SUCCESS,
				result
			}

			expect(res).toEqual(expectedAction)
			done()
		})
	})
})
