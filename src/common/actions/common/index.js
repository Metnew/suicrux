// @flow
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
export type LOCATION_CHANGE_TYPE = {
	type: '@@router/LOCATION_CHANGE',
	payload: {
		pathname: string
	}
}
// XXX: DONT USE INTERNAL REDUX STUFF! e.g. @@INIT is an internal action
// export const APP_INIT = '@@INIT'
export const APPLICATION_INIT = 'APPLICATION_INIT'
export type APPLICATION_INIT_TYPE = {
	type: 'APPLICATION_INIT'
}
