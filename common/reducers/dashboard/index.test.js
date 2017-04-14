import {dashboard as reducer, initialState} from 'reducers/dashboard'
import * as actions from 'actions'

describe('DASHBOARD REDUCER', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {x:'string'})).toEqual(initialState)
    })

    it('should handle LOGOUT_AUTH_SUCCESS', () => {
        expect(reducer(initialState, {
            type: actions.LOGOUT_AUTH_SUCCESS
        })).toEqual(initialState)
    })

    it('should handle LOGIN_AUTH_FAIL', () => {
        expect(reducer(initialState, {
            type: actions.LOGIN_AUTH_FAIL
        })).toEqual(initialState)
    })

    it('should handle LOGIN_AUTH_SUCCESS', () => {
        expect(reducer(initialState, {
            type: actions.LOGIN_AUTH_SUCCESS
        })).toEqual(initialState)
    })
})
