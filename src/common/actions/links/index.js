// @flow
import {getLinksAPI} from 'api/LinksSvc'
// Define action types
export const GET_LINKS_SUCCESS = 'GET_LINKS_SUCCESS'
export const GET_LINKS_FAIL = 'GET_LINKS_FAIL'
export const GET_LINKS_PENDING = 'GET_LINKS_PENDING'

export type GET_LINKS_SUCCESS_TYPE = {
	type: 'GET_LINKS_SUCCESS',
	meta: any,
	payload: any
}

export type GET_LINKS_FAIL_TYPE = {
	type: 'GET_LINKS_FAIL',
	error: true,
	meta: any,
	payload: {
		errors?: void | Object
	}
}

export type GET_LINKS_PENDING_TYPE = {
	type: 'GET_LINKS_PENDING',
	meta: any
}

export const GET_LINKS = () => ({
	type: 'GET_LINKS',
	payload: getLinksAPI()
})
