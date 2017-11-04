// @flow
import {post} from 'api/utils'

export type LoginDataType = {
	username: string,
	password: string
}

export async function loginAPI (data: LoginDataType) {
	return post('/auth', data)
}
