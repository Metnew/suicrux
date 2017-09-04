// @flow
import {get} from 'api/utils'
import qs from 'query-string'

export type GetUsersDataType = {
	id: string
}

export async function getUsersAPI (options: GetUsersDataType) {
	// Support both /users and /users/:id
	const str: string = qs.stringify(options)
	return get(
		`https://jsonplaceholder.typicode.com/users${str ? `?${str}` : ''}`
	)
}
