import {post} from 'api/utils'

export async function loginAPI (data) {
	return post('/auth', data)
}
