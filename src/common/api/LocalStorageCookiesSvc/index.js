// @flow
import Cookies from 'js-cookie'
import decodeJWT from 'jwt-decode'

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

export function getInfoFromJWT () {
	const token = getLocalToken()
	return decodeJWT(token)
}

export const isLoggedIn = () => !!getLocalToken()
