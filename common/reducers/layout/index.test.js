import {layout as reducer} from 'reducers'
import * as actions from 'actions'


const UI_CLOSE_SIDEBAR = {
    type: actions.UI_OPEN_SIDEBAR
}

const UI_OPEN_SIDEBAR = {
    type: actions.UI_OPEN_SIDEBAR
}

const LOCATION_CHANGE = {
    type: actions.LOCATION_CHANGE
}

const initialState = {
    sidebarOpened: false,
    obfuscatorActive: false,
    isMobile: false
}

describe('LAYOUT REDUCER', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {x:'string'})).toEqual(initialState)
    })

    it('should handle UI_OPEN_SIDEBAR', () => {
        expect(reducer(initialState, UI_OPEN_SIDEBAR)).toEqual({
            ...initialState,
            sidebarOpened: true,
            obfuscatorActive: true
        })
    })

    it('should handle UI_CLOSE_SIDEBAR', () => {
        expect(reducer({
            loggedIn: false
        }, UI_CLOSE_SIDEBAR)).toEqual({
            ...initialState,
            sidebarOpened: false,
            obfuscatorActive: false
        })
    })

    it('should handle LOCATION_CHANGE', () => {
        expect(reducer({
            loggedIn: false
        }, LOCATION_CHANGE)).toEqual({
            ...initialState,
            sidebarOpened: false,
            obfuscatorActive: false
        })
    })
})
