import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {Router} from 'react-router'

export default class Root extends Component {
    static propTypes = {
        store: React.PropTypes.object,
        history: React.PropTypes.object,
        routes: React.PropTypes.object
    }

    render() {
        const {store, history, routes} = this.props
        // key={Math.random()} = hack for HMR from https://github.com/webpack/webpack-dev-server/issues/395
        return (
            <Provider store={store} key={Math.random()}>
                <Router history={history} routes={routes} key={Math.random()} />
            </Provider>
        );
    }
}
