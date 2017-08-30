// Request utils,
// Feel free to replace with your code
// (get, post are used in ApiServices)

import {getLocalToken, resetLocalToken} from 'api/LocalStorageCookiesSvc'

export default function requestWrapper (method) {
	return async function (url, data = null, params = {}) {
		if (method === 'GET') {
			// It's a GET response
			// GET doesn't have data
			params = data
			data = null
		} else if (data === Object(data)) {
			// (data === Object(data)) === _.isObject(data)
			data = JSON.stringify(data)
		} else {
			throw new Error(`XHR invalid, check ${method} on ${url}`)
		}

		// Default params for fetch = method + (Content-Type)
		const defaults = {
			method,
			headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			}
		}

		// Check that req url is relative and request was sent to our domain
		if (!/(http|https):\/\//.test(url)) {
			console.log(`Request ${url} was sent to our domain`)
			const token = getLocalToken()
			if (token) {
				defaults.headers.Authorization = `JWT ${token}`
			}
			url = process.env.BASE_API + url
		} else {
			console.log(`Request ${url} was sent to external domain`)
			// Request was set to an external domain
		}

		if (data) {
			defaults.body = data
		}

		const paramsObj = {...defaults, headers: {...params, ...defaults.headers}}
		return fetch(url, paramsObj)
			.then(checkStatus)
			.then(parseJSON)
			.catch(err => {
				console.error(err)
			})
	}
}

// Checks response status in production env
function checkStatus (response) {
	const {status} = response
	if (status >= 200 && status < 300) {
		// Everything is ok
		return response
	} else if (status >= 300 && status < 400) {
		// 300 Multiple Choices
		// 301 - Moved Permanently,
		// 302 - Found, Moved Temporarily
		// 304 - not modified
		// 307 - Temporary Redirect
	} else if (status === 400) {
		// Probably is a validation error
		return response
	} else if (status === 403 || status === 401) {
		// 401 - Forbidden
		// 403 - Unauthorized
		// remove local token in this case
		resetLocalToken()
	} else if (status === 404) {
		// Not Found
		return response
	} else if (status >= 500) {
		// Server error
		return response
	}
}

/**
 // middlewares
 * 1. parse response
 * 2. add "ok" property to result
 * 3. return request result
 * @param  {Object} res - response from server
 * @return {Object} response result with "ok" property
 */
async function parseJSON (res) {
	let json
	try {
		json = await res.json()
	} catch (e) {
		return {data: {}, ok: false}
	}

	// Simplest validation ever, ahah :)
	if (!res.ok) {
		return {data: json, ok: false}
	}
	// ResultOK - is a function with side effects
	// It removes ok property from result object
	return {data: json, ok: true}
}
