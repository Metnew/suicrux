import {post} from './utils';
import * as store from 'store2'

export function getLocalToken() {
    return store.get('auth_token')
}

export function resetLocalToken() {
    store.remove('auth_token')
}
export function setLocalToken(token) {
    store.set('auth_token', token)
}

export function isLoggedIn() {
    return getLocalToken() === null ? false : true
}

export async function login_API(data) {
    if (process.env.BUILD_DEMO) {
        return {
            ok: true,
            token: 'Just_for_demo'
        }
    }
    return await post('/auth', data)
}
