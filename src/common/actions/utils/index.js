function Awral (asyncFunction) {
	return name => (...args) => async (dispatch, getState) => {
		const defaultArgs = {dispatch, getState, name}
		this._pending({...defaultArgs, payload: {args}})
		const preResult = this._transformBeforeCheck.apply(args)
		const obtainedResult = await asyncFunction.apply(preResult)
		const isSuccess = this._check(obtainedResult)
		const result = this._transformAfterCheck(obtainedResult)

		if (isSuccess) {
			this._success({...defaultArgs, payload: {args, result}})
		} else {
			this._fail({...defaultArgs, payload: {args, result}})
		}
		this._finally({...defaultArgs, payload: {args, result}})
	}
}

const actionCreator = status => ({dispatch, name, payload}) => {
	dispatch({type: `${name}_${status.toUpperCase()}`}, payload)
}

const actionsCreators = ['pending', 'success', 'fail', 'finally']
	.map(a => {
		return {[a]: actionCreator(a)}
	})
	.reduce((a, b) => {
		return Object.assign({}, a, b)
	})

const check = ({ok}) => ok
const transformBeforeCheck = a => a
const transformAfterCheck = a => a

const behaviours = {
	...actionsCreators,
	check,
	transformBeforeCheck,
	transformAfterCheck
}

Awral.of = a => {
	return new Awral(a)
}

Object.keys(behaviours).map(key => {
	const initialBehaviour = behaviours[key]
	const privateName = `_${key}`
	Awral[key] = (fn = initialBehaviour) => Awral.of({[privateName]: fn})
})

export default Awral
