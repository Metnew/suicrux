// @flow
import {posts as reducer, initialState} from 'reducers/posts'
import {
	GET_POSTS_PENDING,
	GET_POSTS_SUCCESS,
	GET_POSTS_FAIL
} from 'actions/posts'
import {LOCATION_CHANGE} from 'actions/common'
import type {PostItem} from 'types'

const samplePostItem: PostItem = {
	id: 1,
	title: 'string',
	body: 'string',
	userId: 1
}

const getPostsSuccess = {
	type: GET_POSTS_SUCCESS,
	payload: samplePostItem
}

const getPostsFail = {
	type: GET_POSTS_FAIL,
	payload: {
		errors: {
			ohMyGodThatsAnError: true
		}
	}
}

const getPostsPending = {
	type: GET_POSTS_PENDING
}

const locationChangeToInbox = {
	type: LOCATION_CHANGE,
	payload: {
		pathname: '/inbox'
	}
}

const locationChangeToItself = {
	type: LOCATION_CHANGE,
	payload: {
		pathname: '/'
	}
}

describe('POSTS REDUCER', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {x: 'string'})).toEqual(initialState)
	})

	it('should handle GET_POSTS_PENDING', () => {
		expect(reducer(initialState, getPostsPending)).toEqual({
			...initialState,
			errors: {},
			isLoaded: false,
			isLoading: true
		})
	})

	it('should handle GET_POSTS_SUCCESS', () => {
		expect(reducer(initialState, getPostsSuccess)).toEqual({
			...initialState,
			isLoaded: true,
			isLoading: false,
			errors: {},
			count: 1,
			entities: {
				'1': samplePostItem
			}
		})
	})

	it('should handle GET_POSTS_FAIL', () => {
		expect(reducer(initialState, getPostsFail)).toEqual({
			...initialState,
			isLoaded: true,
			isLoading: false,
			errors: {ohMyGodThatsAnError: true}
		})
	})

	it('should handle LOCATION_CHANGE to other paths', () => {
		const customState = {
			...initialState,
			hello: 'world'
		}
		expect(reducer(customState, locationChangeToInbox)).toEqual(initialState)
	})

	it('should handle LOCATION_CHANGE to own path', () => {
		const customState = {
			...initialState,
			hello: 'world'
		}
		expect(reducer(customState, locationChangeToItself)).toEqual(customState)
	})
})
