// @flow
import {get} from 'api/utils'

export async function getLinksAPI () {
	return get(`/links`)
}
