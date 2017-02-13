import * as layout from './layout';
import * as inbox from './inbox'
import * as auth from './auth'
import * as loginCR from './loginCR'
// import * as error from './error'
import * as dashboard from './dashboard'

import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
export default combineReducers({
    ...layout,
    ...inbox,
    ...auth,
    ...dashboard,
    ...loginCR,
    routing: routerReducer
})
