// @flow
import {awral} from 'actions/utils'
import {getPostsAPI} from 'api/PostsSvc'
import type {PostItem} from 'types'
// Define action types
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const GET_POSTS_FAIL = 'GET_POSTS_FAIL'
export const GET_POSTS_PENDING = 'GET_POSTS_PENDING'

export type GET_POSTS_SUCCESS_TYPE = {
	type: 'GET_POSTS_SUCCESS',
	payload: Array<PostItem>
}

export type GET_POSTS_PENDING_TYPE = {
	type: 'GET_POSTS_FAIL'
}

export type GET_POSTS_FAIL_TYPE = {
	type: 'GET_POSTS_PENDING',
	payload: {
		errors: void | Object
	}
}

export const GET_POSTS = awral(getPostsAPI)('GET_POSTS')
