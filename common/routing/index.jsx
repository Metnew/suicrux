import React from 'react';
import {Route, Redirect, IndexRoute, Router, browserHistory} from 'react-router';
import {App, Inbox, Dashboard, Login} from 'containers';

const Routing = (
    <Router history={browserHistory}>
        <Route name="App" path="/" component={App}>
            <IndexRoute name="Dashboard" component={Dashboard} />
            <Route name="Login" path="/auth" component={Login}/>
            <Route name="Dashboard" path="/" component={Dashboard}/>
            <Route name="Inbox" path="inbox" component={Inbox}/>
            <Redirect from="/*" to="/" />
        </Route>
    </Router>
)

export default Routing;
