// Request utils, feel free to replace with your code (get, post are used in ApiServices) 
import {getLocalToken} from 'api/AuthSvc';
import _ from 'lodash';
import config from 'config'
import {THROW_ERROR} from 'actions/error'

window.BASE_API = config.BASE_API

function requestWrapper(method) {
    return async function(url, data = null, params = {}) {
        if (method === 'GET') {
            params = data;
            data = null;
            // is it a GET?
            // GET HAVE ONLY
        } else if (_.isObject(data)) {
            data = JSON.stringify(data)
            // or is it a PUT, POST, DELETE?
        } else {
            // hmm, strange...
            throw new Error(`XHR invalid, check ${method} for url ${url}`)
        }

        // default params to fetch = method + (Content-Type for lulz)
        let defaults = {
            method: method,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }

        // check that req url is relative and request was sent to our domain
        if (url.match(/^https?:\/\//gi) > -1) { // && urlIsOurs
            let token = getLocalToken();
            if (token) {
                // JWT??? maybe Bearer? no! JWT. RTFM about server-side jwt module
                defaults.headers['Authorization'] = `JWT ${token}`;
            }
            url = window.BASE_API + url;
        } else {
            // if req was sent to another domain
            // yes, it might happens one day
            // it looks like we have to add some handlers here
        }
        // if there is no data => it's GET.
        if (data) {
            defaults.body = data;
        }

        let paramsObj = {...defaults, headers: {...params, ...defaults.headers}}
        console.log(paramsObj)
        return await fetch(url, paramsObj)
                        .then(checkStatus)
                        .then(parseJSON)
                        .catch((err) => {
                            console.error(err)
                            // return THROW_ERROR(err);
                        });
    }
}

// middlewares
// parse fetch json, add ok property and return request result
async function parseJSON(res) {
    let json;
    try {
        json = await res.json()
    } catch (e) {
        return {data: {}, ok: false}
    }

    // simplest validation ever, ahah :)
    if (!res.ok) {
        return {data: json, ok:false}
    }
    // XXX: be carefull, resultOK - is a function with side effects
    // It removes ok property from result object
    return {data: json, ok: true}
}

// checks reqs status
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else if(response.status == 400){
      return response
  } else  {
    var error = new Error(response.statusText)
    error.response = response
    console.error(error)
    // throw error
    return response

  }
}


export const get = requestWrapper('GET')
export const post = requestWrapper('POST')
export const put = requestWrapper('PUT')
export const patch = requestWrapper('PATCH')
export const del = requestWrapper('DELETE')

// USAGE:
// get('https://www.google.com', {
//     Authorization: 'JWT LOL',
//     headers: {
//         'Content-Type': 'text/html'
//     }
// })

// SIDE EFFECTS FUNCTION
export function resultOK(result) {
    if (result) {
        let ok = result.ok
        delete result.ok
        return ok //look at parseJSON
    } else {
        return false
    }
}
