import * as store from 'store2'
import Cookies from 'js-cookie'

export const JWT_TOKEN = 'JWT_TOKEN'

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
	Cookies.set(JWT_TOKEN, token, {expires: 365})
}

export function isLoggedIn () {
	return !!getLocalToken()
}
