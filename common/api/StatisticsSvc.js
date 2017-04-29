import {get} from './utils'

export async function getStatisticsAPI () {
  return get('https://jsonplaceholder.typicode.com/posts?userId=1')
}
