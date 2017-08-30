import {getPostsAPI, resultOK} from 'api'

// Define action types
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const GET_POSTS_FAIL = 'GET_POSTS_FAIL'
export const GET_POSTS_PENDING = 'GET_POSTS_PENDING'

export const GET_POSTS = async () => {
	const result = await getPostsAPI()
	if (!resultOK(result)) {
		return {type: GET_POSTS_FAIL, errors: result.data}
	}
	return {type: GET_POSTS_SUCCESS, result: result.data}
}
