import {layout as reducer, initialState} from 'reducers/layout'
import {UI_TOGGLE_SIDEBAR, UI_WINDOW_RESIZE} from 'actions/layout'
import {LOCATION_CHANGE} from 'actions/common'

const toggleSidebar = {
	type: UI_TOGGLE_SIDEBAR
}

const locationChange = {
	type: LOCATION_CHANGE
}

const windowResize = {
	type: UI_WINDOW_RESIZE,
	payload: {
		innerWidth: 1280
	}
}

const appInit = {
	type: UI_WINDOW_RESIZE,
	payload: {
		innerWidth: 360
	}
}

describe('LAYOUT REDUCER', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {x: 'string'})).toEqual(initialState)
	})

	it('should handle UI_TOGGLE_SIDEBAR (if sidebar is opened)', () => {
		expect(reducer(initialState, toggleSidebar)).toEqual({
			...initialState,
			sidebarOpened: true
		})
	})

	it('should handle UI_TOGGLE_SIDEBAR (if sidebar is closed)', () => {
		expect(
			reducer({...initialState, sidebarOpened: true}, toggleSidebar)
		).toEqual({
			...initialState,
			sidebarOpened: false
		})
	})

	describe('Mobile properties', () => {
		it('should handle WINDOW_RESIZE with 360px screen', () => {
			expect(reducer(initialState, appInit)).toEqual({
				...initialState,
				innerWidth: 360
			})
		})

		it('should handle WINDOW_RESIZE with 1280px screen', () => {
			expect(reducer(initialState, windowResize)).toEqual({
				...initialState,
				innerWidth: 1280
			})
		})
	})

	it('should handle LOCATION_CHANGE', () => {
		expect(reducer(initialState, locationChange)).toEqual({
			...initialState,
			sidebarOpened: false
		})
	})
})
