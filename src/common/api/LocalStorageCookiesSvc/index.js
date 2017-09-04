// @flow
import * as store from 'store2'
import Cookies from 'js-cookie'

export const JWT_TOKEN = 'JWT_TOKEN'

export function getLocalToken (): string | null {
	return store.get(JWT_TOKEN) || Cookies.get(JWT_TOKEN)
}

export function resetLocalToken () {
	store.remove(JWT_TOKEN)
	Cookies.remove(JWT_TOKEN)
}

export function setLocalToken (token: string) {
	store.set(JWT_TOKEN, token)
	Cookies.set(JWT_TOKEN, token, {expires: 365})
}

export const isLoggedIn = () => !!getLocalToken()
