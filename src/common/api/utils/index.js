import requestWrapper from './xhr_wrapper'

// EXPORT NORMALIZE STUFF!
export {normalizeArrayOfItems} from './normalize'
// create request wrappers
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

// Utils for response normalization

// FUNCTION WITH SIDE-EFFECTS
/**
 * `parseJSON()` adds property "ok"
 * that identicates that response is OK
 *
 * `resultOK`removes result.ok from result and returns "ok" property
 *  It widely used in `/actions/*`
 *  for choosing action to dispatch after request to API
 *
 * @param  {Object} result - response result that
 * @return {bool} - indicates was request successful or not
 */
export function resultOK (result) {
  if (result) {
    let ok = result.ok
    delete result.ok
    return ok // look at parseJSON
  } else {
    return false
  }
}
