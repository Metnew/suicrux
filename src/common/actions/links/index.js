// @flow
import {getLinksAPI} from 'api/LinksSvc'
// Define action types
export const GET_LINKS_FULFILLED = 'GET_LINKS_FULFILLED'
// GET_LINKS_REJECTED isn't handled in the boilerplate.
// export const GET_LINKS_REJECTED = 'GET_LINKS_REJECTED'
export const GET_LINKS_PENDING = 'GET_LINKS_PENDING'

export const GET_LINKS = () => ({
	type: 'GET_LINKS',
	payload: getLinksAPI()
})
