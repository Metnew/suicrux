import React, {Component} from 'react';
import {Provider} from 'react-redux'
import routes from './routing';
import {Router} from 'react-router';

export default class Root extends Component {
    static propTypes = {
        store: React.PropTypes.object,
        history: React.PropTypes.object
    }

    render() {
        const {store, history} = this.props;
        return (
            <Provider store={store}>
                <Router routes={routes} history={history}/>
            </Provider>
        );
    }
}
