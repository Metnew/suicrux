/* eslint-disable */
import {layout as reducer} from 'reducers/layout'
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

const APP_INIT = {
    type: actions.APP_INIT
}

const initialState = {
    sidebarOpened: false,
    isMobile: false
}

describe('LAYOUT REDUCER', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {x:'string'})).toEqual(initialState)
    })

    it('should handle UI_OPEN_SIDEBAR', () => {
        expect(reducer(initialState, UI_OPEN_SIDEBAR)).toEqual({
            ...initialState,
            sidebarOpened: true
        })
    })

    it('should handle APP_INIT', () => {
        expect(reducer(initialState, APP_INIT)).toEqual({
            ...initialState,
            isMobile: true
            // `window.innerWidth` is 1024px in test env
        })
    })

    it('should handle WINDOW_RESIZE', () => {
        expect(reducer(initialState, UI_WINDOW_RESIZE)).toEqual({
            ...initialState,
            isMobile: true
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
