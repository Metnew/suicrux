const actionCreator = status => ({
	dispatch,
	ACTION_NAME,
	getState,
	...rest
}) => {
	dispatch({type: `${ACTION_NAME}_${status.toUpperCase()}`, ...rest})
}

const getDefaultBehaviours = () => {
	const actions = [
		'pending',
		'success',
		'fail',
		'finally'
	].map(a => {
		return {[a]: actionCreator(a)}
	})

	const id = a => a
	const ids = ['meta', 'check', 'fnPayload', 'transformResult', 'resolve'].map(
		a => ({
			[a]: id
		})
	)

	return actions.concat(ids).reduce((a, b) => {
		return Object.assign({}, a, b)
	})
}

/**
  Create default Awral
  Awral is not recommended for production usage now
  But it can make your work with actions even simpler.
  NOTE: I strongly recommend you check Awral sources!
  Awral is 910 bytes gzipped!
  {@link https://github.com/Metnew/awral}
*/
function Awral (asyncFunction) {
	return ACTION_NAME => (...args) => async (dispatch, getState) => {
		const basicArgs = {dispatch, getState, ACTION_NAME}
		const meta = this.meta.apply(basicArgs, args) || null
		const defaultArgs = {...basicArgs, meta}

		if (this.failBeforePending) {
			const failBeforePendingPayload = this.failBeforePending.apply(
				defaultArgs,
				args
			)
			if (failBeforePendingPayload) {
				return this.fail({
					...defaultArgs,
					payload: failBeforePendingPayload,
					error: true
				})
			}
		}

		this.pending && this.pending(defaultArgs)
		const fnPayload = this.fnPayload.apply(defaultArgs, args)
		// FIXME: We should catch errors inside	`asyncFunction`
		// try {} catch (e) {}
		const res = await asyncFunction(fnPayload)
		const isSuccess = this.check(res)
		const status = isSuccess ? {success: true} : {error: true}
		const payload = this.transformResult(res)

		if (isSuccess) {
			this.success({...defaultArgs, payload})
		} else {
			this.fail({...defaultArgs, payload, error: true})
		}
		this.finally && this.finally(defaultArgs)
		return this.resolve({payload, status})
	}
}

const ofFn = function (newBehaviours = {}) {
	const behaviours = {...this.behaviours, ...newBehaviours}
	const bindedAwral = Awral.bind(behaviours)
	bindedAwral.behaviours = behaviours
	bindedAwral.of = ofFn.bind(bindedAwral)
	return bindedAwral
}

export default ofFn.call({behaviours: getDefaultBehaviours()})
