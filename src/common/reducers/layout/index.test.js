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

<<<<<<< HEAD
	it('should handle UI_TOGGLE_SIDEBAR (if sidebar is opened)', () => {
		expect(reducer(initialState, toggleSidebar)).toEqual({
			...initialState,
=======
	it('should handle UI_TOGGLE_SIDEBAR', () => {
		expect(
			reducer({innerWidth: 480, sidebarOpened: false}, toggleSidebar)
		).toEqual({
			innerWidth: 480,
>>>>>>> feat/3.0-release
			sidebarOpened: true
		})
	})

<<<<<<< HEAD
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
=======
	describe('Mobile properties WINDOW_RESIZE', () => {
		it('should handle WINDOW_RESIZE with 360px screen', () => {
			expect(reducer(initialState, windowResize(360))).toEqual({
				sidebarOpened: false,
>>>>>>> feat/3.0-release
				innerWidth: 360
			})
		})

		it('should handle WINDOW_RESIZE with 1280px screen', () => {
<<<<<<< HEAD
			expect(reducer(initialState, windowResize)).toEqual({
				...initialState,
=======
			expect(reducer(initialState, windowResize(1280))).toEqual({
				sidebarOpened: true,
>>>>>>> feat/3.0-release
				innerWidth: 1280
			})
		})
	})

<<<<<<< HEAD
	it('should handle LOCATION_CHANGE', () => {
		expect(reducer(initialState, locationChange)).toEqual({
			...initialState,
			sidebarOpened: false
=======
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
>>>>>>> feat/3.0-release
		})
	})
})
