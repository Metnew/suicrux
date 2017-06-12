/* eslint-disable */
import { loginCR as reducer } from 'reducers/login_component_reducer'
import * as actions from 'actions'

const initialState = {
    loginError: false,
    loginSuccess: false
}

const LOGIN_AUTH_FAIL = {
    error: ["error"],
    type: actions.LOGIN_AUTH_FAIL
}

const LOGIN_AUTH_SUCCESS = {
    type: actions.LOGIN_AUTH_SUCCESS
}

describe('LOGIN_COMPONENT REDUCER', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { x: 'string' })).toEqual(initialState)
    })

    it('should handle LOGIN_AUTH_FAIL', () => {
        expect(reducer(initialState, LOGIN_AUTH_FAIL)).toEqual({
            ...initialState,
            loginError: ["error"],
            loginSuccess: false
        })
    })

    it('should handle LOGIN_AUTH_SUCCESS', () => {
        expect(reducer(initialState, LOGIN_AUTH_SUCCESS)).toEqual({
            ...initialState,
            loginError: false,
            loginSuccess: true
        })
    })
})
