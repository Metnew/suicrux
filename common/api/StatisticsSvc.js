import {get} from './utils'

export async function getStatistics_API() {
	return await get('/statistics')
}
