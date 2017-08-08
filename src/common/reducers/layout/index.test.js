/* eslint-disable */
import {layout as reducer, initialState} from 'reducers/layout'
import * as actions from 'actions'

const UI_CLOSE_SIDEBAR = {
	type: actions.UI_CLOSE_SIDEBAR
}

const UI_OPEN_SIDEBAR = {
	type: actions.UI_OPEN_SIDEBAR
}

const LOCATION_CHANGE = {
	type: actions.LOCATION_CHANGE
}

const UI_WINDOW_RESIZE = {
	type: actions.UI_WINDOW_RESIZE
}

const APPLICATION_INIT = {
	type: actions.APPLICATION_INIT
}

describe('LAYOUT REDUCER', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {x: 'string'})).toEqual(initialState)
	})

	it('should handle UI_OPEN_SIDEBAR', () => {
		expect(reducer(initialState, UI_OPEN_SIDEBAR)).toEqual({
			...initialState,
			sidebarOpened: true
		})
	})

	it('should handle APPLICATION_INIT', () => {
		expect(reducer(initialState, APPLICATION_INIT)).toEqual({
			...initialState,
			isMobile: true,
			isMobileXS: false,
			isMobileSM: false
			// `window.innerWidth` is 1024px in test env
		})
	})

	it('should handle WINDOW_RESIZE', () => {
		expect(reducer(initialState, UI_WINDOW_RESIZE)).toEqual({
			...initialState,
			isMobile: true,
			isMobileXS: false,
			isMobileSM: false
			// `window.innerWidth` is 1024px in test env
		})
	})

	it('should handle UI_CLOSE_SIDEBAR', () => {
		expect(reducer(initialState, UI_CLOSE_SIDEBAR)).toEqual({
			...initialState,
			sidebarOpened: false
		})
	})

	it('should handle LOCATION_CHANGE', () => {
		expect(reducer(initialState, LOCATION_CHANGE)).toEqual({
			...initialState,
			sidebarOpened: false
		})
	})
})
