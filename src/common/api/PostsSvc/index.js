// @flow
import {get} from 'api/utils'
import qs from 'query-string'

export async function getPostsAPI (userId: number = 1) {
	const str: string = qs.stringify({userId})
	return get(
		`https://jsonplaceholder.typicode.com/posts${str ? `?${str}` : ''}`
	)
}
