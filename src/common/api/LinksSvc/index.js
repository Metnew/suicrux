// @flow
import {get} from 'api/utils'

export const getLinksAPI = async () =>
	get(`http://${process.env.HOST}:${process.env.PORT}/api/links`)
