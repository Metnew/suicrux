/* eslint-disable */
import {dashboard as reducer, initialState} from 'reducers/dashboard'
import * as actions from 'actions'


const GET_STATISTICS_SUCCESS = {
    type: actions.GET_STATISTICS_SUCCESS,
    result: ["hello"]
}

const GET_STATISTICS_FAIL = {
    type: actions.GET_STATISTICS_FAIL
}

const LOCATION_CHANGE = {
    type: actions.LOCATION_CHANGE,
    payload: {
        pathname: '/'
    }
}

describe('DASHBOARD REDUCER', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {x:'string'})).toEqual(initialState)
    })

    it('should handle GET_STATISTICS_SUCCESS', () => {
        expect(reducer(initialState, GET_STATISTICS_SUCCESS)).toEqual({
            ...initialState,
            statistics: ["hello"]
        })
    })

    it('should handle GET_STATISTICS_FAIL', () => {
        expect(reducer(initialState, GET_STATISTICS_FAIL)).toEqual(initialState)
    })

    it('should handle LOCATION_CHANGE to own path', () => {
        let customState = {
            ...initialState,
            lol: 3
        }
        expect(reducer(customState, LOCATION_CHANGE)).toEqual(customState)
    })
})
