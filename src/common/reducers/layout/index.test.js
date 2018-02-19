import {layout as reducer, initialState} from 'reducers/layout'
import {UI_TOGGLE_SIDEBAR, UI_WINDOW_RESIZE} from 'actions/layout'
import {LOCATION_CHANGE} from 'actions/common'

const toggleSidebar = {
	type: UI_TOGGLE_SIDEBAR
}

const locationChange = {
	type: LOCATION_CHANGE
}

const windowResize = (innerWidth) => ({type: UI_WINDOW_RESIZE, payload: {innerWidth}})

describe('LAYOUT REDUCER', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {x: 'string'})).toEqual(initialState)
	})

	it('should handle UI_TOGGLE_SIDEBAR', () => {
		expect(
			reducer({innerWidth: 480, sidebarOpened: false}, toggleSidebar)
		).toEqual({
			innerWidth: 480,
			sidebarOpened: true
		})
	})

	describe('Mobile properties WINDOW_RESIZE', () => {
		it('should handle WINDOW_RESIZE with 360px screen', () => {
			expect(reducer(initialState, windowResize(360))).toEqual({
				sidebarOpened: false,
				innerWidth: 360
			})
		})

		it('should handle WINDOW_RESIZE with 1280px screen', () => {
			expect(reducer(initialState, windowResize(1280))).toEqual({
				sidebarOpened: true,
				innerWidth: 1280
			})
		})
	})

	describe('LOCATION_CHANGE', () => {
		it('should close sidebar on mobile after LOCATION_CHANGE', () => {
			expect(reducer({sidebarOpened: true, innerWidth: 360}, locationChange)).toEqual({
				innerWidth: 360,
				sidebarOpened: false
			})
		})

		it('should NOT close sidebar on desktop after LOCATION_CHANGE', () => {
			expect(reducer({sidebarOpened: true, innerWidth: 993}, locationChange)).toEqual({
				innerWidth: 993,
				sidebarOpened: true
			})
		})
	})
})
