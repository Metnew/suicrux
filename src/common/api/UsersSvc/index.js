import {get} from 'api/utils'

export async function getUsersAPI (id) {
  // support both /users and /users/:id
  console.log(`https://jsonplaceholder.typicode.com/users${id ? '/' + id : ''}`)
  return get(`https://jsonplaceholder.typicode.com/users${id ? '/' + id : ''}`)
}
