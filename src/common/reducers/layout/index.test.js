import {layout as reducer, initialState} from 'reducers/layout'
import {
	UI_CLOSE_SIDEBAR,
	UI_OPEN_SIDEBAR,
	UI_WINDOW_RESIZE
} from 'actions/layout'
import {LOCATION_CHANGE} from 'actions/common'

const closeSidebar = {
	type: UI_CLOSE_SIDEBAR
}

const openSidebar = {
	type: UI_OPEN_SIDEBAR
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

	it('should handle UI_OPEN_SIDEBAR', () => {
		expect(reducer(initialState, openSidebar)).toEqual({
			...initialState,
			sidebarOpened: true
		})
	})

	describe('Mobile properties', () => {
		it('should handle WINDOW_RESIZE with 360px screen', () => {
			expect(reducer(initialState, appInit)).toEqual({
				...initialState,
				isMobile: true,
				isMobileXS: true,
				isMobileSM: false
			})
		})

		it('should handle WINDOW_RESIZE with 1280px screen', () => {
			expect(reducer(initialState, windowResize)).toEqual({
				...initialState,
				isMobile: false,
				isMobileXS: false,
				isMobileSM: false
			})
		})
	})

	it('should handle UI_CLOSE_SIDEBAR', () => {
		expect(reducer(initialState, closeSidebar)).toEqual({
			...initialState,
			sidebarOpened: false
		})
	})

	it('should handle LOCATION_CHANGE', () => {
		expect(reducer(initialState, locationChange)).toEqual({
			...initialState,
			sidebarOpened: false
		})
	})
})
