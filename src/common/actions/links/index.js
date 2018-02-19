// @flow
import {getLinksAPI} from 'api/LinksSvc'
// Define action types
export const GET_LINKS_FULFILLED = 'GET_LINKS_FULFILLED'
// GET_LINKS_REJECTED isn't handled in the boilerplate.
// export const GET_LINKS_REJECTED = 'GET_LINKS_REJECTED'
export const GET_LINKS_PENDING = 'GET_LINKS_PENDING'

<<<<<<< HEAD
export type GET_LINKS_SUCCESS_TYPE = {
	type: 'GET_LINKS_SUCCESS',
	meta: any,
	payload: Array<LinkItem>
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

/**
  Awral is not recommended for production usage now
  But it can make your work with actions even simpler.
  NOTE: I strongly recommend you check Awral's sources!
  Awral is 910 bytes gzipped!
  {@link https://github.com/Metnew/awral}
*/
export const GET_LINKS = awral(getLinksAPI)('GET_LINKS')
=======
export const GET_LINKS = () => ({
	type: 'GET_LINKS',
	payload: getLinksAPI()
})
>>>>>>> feat/3.0-release
