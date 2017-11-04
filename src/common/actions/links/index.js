// @flow
import {awral} from 'actions/utils'
import {getLinksAPI} from 'api/LinksSvc'
import type {LinkItem} from 'types'
// Define action types
export const GET_LINKS_SUCCESS = 'GET_LINKS_SUCCESS'
export const GET_LINKS_FAIL = 'GET_LINKS_FAIL'
export const GET_LINKS_PENDING = 'GET_LINKS_PENDING'

export type GET_LINKS_SUCCESS_TYPE = {
	type: 'GET_LINKS_SUCCESS',
	payload: Array<LinkItem>
}

export type GET_LINKS_FAIL_TYPE = {
	type: 'GET_LINKS_FAIL',
	payload: {
		errors?: void | Object
	}
}

export type GET_LINKS_PENDING_TYPE = {
	type: 'GET_LINKS_PENDING'
}

export const GET_LINKS = awral(getLinksAPI)('GET_LINKS')
