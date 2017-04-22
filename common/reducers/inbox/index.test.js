/* eslint-disable */
import {inbox as reducer, initialState} from 'reducers/inbox'
import * as actions from 'actions'

describe('INBOX REDUCER', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {x: 'string'})).toEqual(initialState)
    })

    it('should handle GET_INBOX_SUCCESS', () => {
        expect(reducer(initialState, {
            type: actions.GET_INBOX_SUCCESS,
            result: ["lol"]
        })).toEqual({
            ...initialState,
            conversations: ["lol"]
        })
    })

    it('should handle GET_INBOX_FAIL', () => {
        expect(reducer(initialState, {type: actions.GET_INBOX_FAIL})).toEqual({
            ...initialState,
            errorLoadingConversations: true,
            conversations: []
        })
    })

    it('should return same state if LOCATION_CHANGE navigates to same route', () => {
        let state = {
            lol: 1
        }
        expect(reducer(state, {
            type: actions.LOGIN_AUTH_SUCCESS,
            payload: {
                pathname: '/inbox'
            }
        })).toEqual(state)
    })
})
