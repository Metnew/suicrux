// @flow
export {get, post, put, patch, del} from './xhr_wrapper'
// EXPORT NORMALIZE STUFF
export {normalizeArrayOfItems} from './normalize'
/**
 * `parseJSON()` adds property "ok"
 *  that identicates that response is OK
 *
 *  This func is widely used in `/actions/*`
 *  to determinate which action to dispatch next - either success or fail
 *
 * @param  {Object} result - response result that
 * @return {bool} - indicates was request successful or not
 */
export function resultOK (result: Object = {ok: false}): boolean {
	return result.ok // Look at parseJSON
}
