import {get} from 'api/utils'

export async function getUsersAPI (id) {
	// Support both /users and /users/:id
	return get(`https://jsonplaceholder.typicode.com/users${id ? '/' + id : ''}`)
}
