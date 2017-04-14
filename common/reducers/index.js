import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import * as layout from './layout';
import * as inbox from './inbox'
import * as auth from './auth'
import * as loginCR from './login_component_reducer'
import * as dashboard from './dashboard'

export const rootReducer = combineReducers({
    ...layout,
    ...inbox,
    ...auth,
    ...dashboard,
    ...loginCR,
    routing: routerReducer
})
