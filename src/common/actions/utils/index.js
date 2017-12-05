// @flow
import Awral from './awral'
/**
 * `parseJSON()` adds property "ok"
 *  that identicates that response is OK
 *
 *  This func to determinates is response from API was successful or failed
 *
 * @param  {Object} result - response from API
 * @return {Boolean} - indicates was request successful or not
 */
const check = (result: Object = {ok: false}): boolean => result.ok
// see ./awral
const failBeforePending = null
const transformResult = a => a.data
// disable dispatch of *_FINALLY actions
const finallyAction = null

/**
  Create default Awral
  Awral is not recommended for production usage now
  But it can make your work with actions even simpler.
  NOTE: I strongly recommend you check Awral's sources!
  Awral is 910 bytes gzipped!
  some docs here: {@link https://github.com/Metnew/awral}
*/
export const awral = Awral.of({check, failBeforePending, transformResult, finally: finallyAction})
