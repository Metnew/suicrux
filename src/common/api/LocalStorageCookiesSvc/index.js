// @flow
import Cookies from 'js-cookie'
// By default, we don't use localStorage, but store2 is already installed
// import store from 'store2'
export const JWT_TOKEN = 'JWT_TOKEN'

export function getLocalToken (): string | null {
	return Cookies.get(JWT_TOKEN)
}

export function resetLocalToken () {
	Cookies.remove(JWT_TOKEN)
}

export function setLocalToken (token: string) {
	Cookies.set(JWT_TOKEN, token, {expires: 365})
}

export const isLoggedIn = () => !!getLocalToken()
