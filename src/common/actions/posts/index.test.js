import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
	GET_POSTS_SUCCESS,
	GET_POSTS_PENDING,
	GET_POSTS_FAIL,
	GET_POSTS
} from 'actions/posts'
import {getPostsAPI} from 'api/PostsSvc'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('POSTS actions', () => {
	it('creates GET_POSTS_SUCCESS when GET_POSTS was successful', async done => {
		const store = mockStore({})
		const apiResult = await getPostsAPI(1)
		const samplePayload = apiResult.data

		store.dispatch(GET_POSTS(1)).then(() => {
			const actions = store.getActions()
			const success = {
				type: GET_POSTS_SUCCESS,
				payload: samplePayload
			}
			const pending = {
				type: GET_POSTS_PENDING
			}
			const expectedActions = [pending, success]

			expect(actions).toMatchObject(expectedActions)
			done()
		})
	})

	xit('creates GET_POSTS_FAIL when GET_POSTS was unsuccessful', done => {
		const store = mockStore({})
		return store.dispatch(GET_POSTS(1)).then(() => {
			const actions = store.getActions()
			const success = {
				type: GET_POSTS_SUCCESS,
				payload: []
			}
			const pending = {
				type: GET_POSTS_PENDING
			}
			const expectedActions = [pending, success]

			console.log(actions)

			expect(actions).toEqual(expectedActions)
			done()
		})
	})
})
