import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {Router} from 'react-router';

export default class Root extends Component {
    static propTypes = {
        store: React.PropTypes.object,
        history: React.PropTypes.object,
        routes: React.PropTypes.object,
    }

    render() {
        const {store, history, routes} = this.props;
        return (
            <Provider store={store}>
                <Router routes={routes} history={history}/>
            </Provider>
        );
    }
}
