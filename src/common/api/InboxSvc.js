import {get} from './utils'

export async function getInboxAPI () {
  return get('https://jsonplaceholder.typicode.com/users')
}
