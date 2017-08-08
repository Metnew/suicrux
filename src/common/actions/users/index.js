import {resultOK, getUsersAPI} from 'api'

// Define action types
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export const GET_USERS_FAIL = 'GET_USERS_FAIL'
export const GET_USERS_PENDING = 'GET_USERS_PENDING'

export const GET_USERS = async id => {
	const result = await getUsersAPI(id)
	if (!resultOK(result)) {
		return {type: GET_USERS_FAIL, errors: result.data}
	}
	return {type: GET_USERS_SUCCESS, result: result.data}
}
