import {post} from 'api/utils'
import * as store from 'store2'
import Cookies from 'js-cookie'

const JWT_TOKEN = 'JWT_TOKEN'

export function getLocalToken () {
  const token = store.get(JWT_TOKEN) || Cookies.get(JWT_TOKEN)
  return token
}

export function resetLocalToken () {
  store.remove(JWT_TOKEN)
  Cookies.remove(JWT_TOKEN)
}

export function setLocalToken (token) {
  store.set(JWT_TOKEN, token)
  Cookies.set(JWT_TOKEN, token)
}

export function isLoggedIn () {
  return !!getLocalToken()
}

export async function loginAPI (data) {
  if (process.env.BUILD_DEMO) {
    return {
      ok: true,
      data: {
        [JWT_TOKEN]: 'Just_for_demo'
      }
    }
  }
  return post('/auth', data)
}
