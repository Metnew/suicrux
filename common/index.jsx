import React from 'react';
import {render} from 'react-dom';
import 'whatwg-fetch'
// css core libs
import 'normalize.css';
import 'semantic-ui-css/semantic.css';
import 'styles/index.scss';
// main component
import {browserHistory} from 'react-router';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import RootReducer from './reducers'
import Root from './Root'

/*
// @param Object - initialState from server
*/
function configureStore() {
    // have to add initialState here
    const middleware = applyMiddleware(routerMiddleware(browserHistory));
    const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)), middleware);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

const preloadedState = window.__PRELOADED_STATE__ // for SSR - server-side generated store
const store = configureStore(preloadedState);
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Root history={history} store={store}/>, document.getElementById('app'))

if (module.hot) {
    module.hot.accept()
}
