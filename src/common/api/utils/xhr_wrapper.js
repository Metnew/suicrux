// Request utils,
// feel free to replace with your code
// (get, post are used in ApiServices)

import {getLocalToken, resetLocalToken} from 'api'

export default function requestWrapper (method) {
  return async function (url, data = null, params = {}) {
    if (method === 'GET') {
      // is it a GET?
      // GET doesn't have data
      params = data
      data = null
    } else if (data === Object(data)) {
      // (data === Object(data)) === _.isObject(data)
      data = JSON.stringify(data)
    } else {
      throw new Error(`XHR invalid, check ${method} on ${url}`)
    }

    // default params for fetch = method + (Content-Type)
    let defaults = {
      method: method,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }

    // check that req url is relative and request was sent to our domain
    if (url.match(/^https?:\/\//gi) > -1) {
      const token = getLocalToken()
      if (token) {
        defaults.headers['Authorization'] = `JWT ${token}`
      }
      url = process.env.BASE_API + url
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

// checks response status in production env
function checkStatus (response) {
  const {status} = response
  if (status >= 200 && status < 300) {
    // everything is ok
    return response
  } else if (status >= 300 && status < 400) {
    // 300 Multiple Choices
    // 301 - Moved Permanently,
    // 302 - Found, Moved Temporarily
    // 304 - not modified
    // 307 - Temporary Redirect
  } else if (status === 400) {
    // probably is a validation error
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

  // simplest validation ever, ahah :)
  if (!res.ok) {
    return {data: json, ok: false}
  }
  // resultOK - is a function with side effects
  // It removes ok property from result object
  return {data: json, ok: true}
}
