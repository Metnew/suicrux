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
    type: actions.LOGIN_AUTH_FAIL,
    errors: {
      hmmThatsAnError: {
        xxx: 1
      }
    }
  }
  const LOGIN_AUTH_SUCCESS = {
    type: actions.LOGIN_AUTH_SUCCESS,
    result: {
      token: 'iamnotatoken'
    }
  }

  it('should handle LOGOUT_AUTH_SUCCESS', () => {
    expect(
      reducer(
        {
          ...initialState,
          loggedIn: true,
          token: 'iamnotatoken'
        },
        LOGOUT_AUTH_SUCCESS
      )
    ).toEqual({
      token: null,
      errors: {},
      loggedIn: false
    })
  })

  it('should handle LOGIN_AUTH_FAIL', () => {
    expect(reducer(initialState, LOGIN_AUTH_FAIL)).toEqual({
      ...initialState,
      loggedIn: false,
      token: null,
      errors: {
        hmmThatsAnError: {
          xxx: 1
        }
      }
    })
  })

  it('should handle LOGIN_AUTH_SUCCESS', () => {
    expect(reducer(initialState, LOGIN_AUTH_SUCCESS)).toEqual({
      ...initialState,
      token: 'iamnotatoken',
      loggedIn: true
    })
  })
})
