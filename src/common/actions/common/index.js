// @flow
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
export type LOCATION_CHANGE_TYPE = {
	type: '@@router/LOCATION_CHANGE',
	payload: {
		pathname: string
	}
}

// NOTE: DON'T USE REDUX INTERNALS!
export const APPLICATION_INIT = 'APPLICATION_INIT'
export type APPLICATION_INIT_TYPE = {
	type: 'APPLICATION_INIT'
}
