import { post } from './utils'
import * as store from 'store2'

export function getLocalToken () {
  return store.get('auth_token')
}

export function resetLocalToken () {
  store.remove('auth_token')
}
export function setLocalToken (token) {
  store.set('auth_token', token)
}

export function isLoggedIn () {
  return getLocalToken() !== null
}

export async function loginAPI (data) {
  if (process.env.BUILD_DEMO) {
    return {
      ok: true,
      token: 'Just_for_demo'
    }
  }
  return post('/auth', data)
}
