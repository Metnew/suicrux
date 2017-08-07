import {get} from 'api/utils'

export async function getPostsAPI () {
	return get('https://jsonplaceholder.typicode.com/posts?userId=1')
}
