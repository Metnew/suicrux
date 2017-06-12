/* eslint-disable */
import {auth as reducer, initialState} from 'reducers/auth'
import * as actions from 'actions'

describe('AUTH REDUCER', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {x: 'string'})).toEqual(initialState)
    })

    const LOGOUT_AUTH_SUCCESS = {
        type: actions.LOGOUT_AUTH_SUCCESS
    }
    const LOGIN_AUTH_FAIL = {
        type: actions.LOGIN_AUTH_FAIL
    }
    const LOGIN_AUTH_SUCCESS = {
        type: actions.LOGIN_AUTH_SUCCESS
    }

    it('should handle LOGOUT_AUTH_SUCCESS', () => {
        expect(reducer({
            ...initialState,
            loggedIn: true
        }, LOGOUT_AUTH_SUCCESS)).toEqual({
            ...initialState,
            loggedIn: false
        })
    })

    it('should handle LOGIN_AUTH_FAIL', () => {
        expect(reducer(initialState, LOGIN_AUTH_FAIL)).toEqual({
            ...initialState,
            loggedIn: false
        })
    })

    it('should handle LOGIN_AUTH_SUCCESS', () => {
        expect(reducer(initialState, LOGIN_AUTH_SUCCESS)).toEqual({
            ...initialState,
            loggedIn: true
        })
    })
})
