// @flow
import {get} from 'api/utils'
import qs from 'query-string'

export async function getUsersAPI (id: string) {
	// Support both /users and /users/:id
	const str: string = qs.stringify({id})
	return get(
		`https://jsonplaceholder.typicode.com/users${str ? `?${str}` : ''}`
	)
}
