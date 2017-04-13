import {dashboard as reducer} from 'reducers'
import * as actions from 'actions'

describe('DASHBOARD REDUCER', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {x:'string'})).toEqual({loggedIn:false})
    })

    it('should handle LOGOUT_AUTH_SUCCESS', () => {
        expect(reducer({
            loggedIn: true
        }, {
            type: actions.LOGOUT_AUTH_SUCCESS
        })).toEqual({
            loggedIn: false
        })
    })

    it('should handle LOGIN_AUTH_FAIL', () => {
        expect(reducer({
            loggedIn: false
        }, {
            type: actions.LOGIN_AUTH_FAIL
        })).toEqual({
            loggedIn: false
        })
    })

    it('should handle LOGIN_AUTH_SUCCESS', () => {
        expect(reducer({
            loggedIn: false
        }, {
            type: actions.LOGIN_AUTH_SUCCESS
        })).toEqual({
            loggedIn: true
        })
    })
})
