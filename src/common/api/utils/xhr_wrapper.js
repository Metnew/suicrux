// Request utils,
// Feel free to replace with your code
// (get, post are used in ApiServices)

import {getLocalToken, resetLocalToken} from 'api/LocalStorageCookiesSvc'

/**
 * Create request wrapper for certain method
 * @param  {String} method - Request method
 * @return {Function}
 */
export default function (method) {
	/**
	 * Creates request to `url` with `data`
	 * @param  {String} url        		Request URL
	 * @param  {Object} [data= null]	Data for Request
	 * @return {Object}             	Request response
	 */
	return async (url, data = null) => {
		// get decorated url and request params
		const {URL, request} = decorateRequest({method, url, data})
		// create request!
		return fetch(URL, request).then(checkStatus).then(parseJSON).catch(err => {
			console.error(err)
			return err
		})
	}
}
/**
 * Create
 * @param  {String} method 			 -	Request method
 * @param  {String} url 				 -  Request URL
 * @param  {Object} [data= null] -	Data for Request
 * @return {Object}        			 - 	Decorated request params
 */
function decorateRequest ({method, url, data}) {
	// Default params for fetch = method + (Content-Type)
	const defaults = {
		method,
		headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		}
	}
	const token = getLocalToken()
	const isRequestToExternalResource = /(http|https):\/\//.test(url)
	const URL = isRequestToExternalResource ? url : process.env.BASE_API + url

	const requestAuthDecoration =
		!isRequestToExternalResource && token
			? {headers: {Authorization: `JWT ${getLocalToken()}`}}
			: {}

	const requesDataDecoration = data ? {body: JSON.stringify(data)} : {}
	const request = Object.assign(
		{},
		defaults,
		requestAuthDecoration,
		requesDataDecoration
	)

	if (!isRequestToExternalResource) {
		console.log(`Request ${url} was sent to our domain`, request)
	} else {
		console.log(`Request ${url} was sent to external domain`, request)
	}

	return {
		request,
		URL
	}
}

/**
 * Checks response status
 * @param  {Object} response - Response
 * @return {Object}          - Response
 */
function checkStatus (response) {
	const {status} = response
	if (status >= 200 && status < 300) {
		// Everything is ok
	} else if (status >= 300 && status < 400) {
		// 300 Multiple Choices
		// 301 - Moved Permanently,
		// 302 - Found, Moved Temporarily
		// 304 - not modified
		// 307 - Temporary Redirect
	} else if (status === 400) {
		// Probably is a validation error
	} else if (status === 403 || status === 401) {
		// 401 - Forbidden
		// 403 - Unauthorized
		// remove local token in this case
		resetLocalToken()
	} else if (status === 404) {
		// Not Found
	} else if (status >= 500) {
		// Server error
	}
	return response
}

/**
 * middlewares
 * 1. parse response
 * 2. add "ok" property to result
 * 3. return request result
 * @param  {Object} res - Response from resource
 * @return {Object} response result with "ok" property
 */
async function parseJSON (res) {
	let json
	try {
		json = await res.json()
	} catch (e) {
		return {data: {}, ok: false}
	}

	// Simplest validation ever
	if (!res.ok) {
		return {data: json, ok: false}
	}
	// ResultOK - is a function with side effects
	// It removes ok property from result object
	return {data: json, ok: true}
}
