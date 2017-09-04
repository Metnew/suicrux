// @flow
export {get, post, put, patch, del} from './xhr_wrapper'

// EXPORT NORMALIZE STUFF!
export {normalizeArrayOfItems} from './normalize'

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
export function resultOK (result: Object = {ok: false}) {
	const {ok}: boolean = result
	delete result.ok
	return ok // Look at parseJSON
}
