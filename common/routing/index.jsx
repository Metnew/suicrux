import React from 'react';
import {Route, Redirect, browserHistory, IndexRoute} from 'react-router';
import {useBasename} from 'history'
import {App, Inbox, Dashboard, Login} from 'containers';

export const history = getHistory()

export const Routing = (
        <Route name="App" path='' component={App}>
            <IndexRoute name="Login" component={Login} />
            <Route name="Login" exact path="/auth" component={Login}/>
            <Route name="Inbox" exact path="/inbox" component={Inbox}/>
            <Route name="Dashboard" path="/" component={Dashboard}/>
            <Redirect from="/*" to="/" />
        </Route>
)

export const sidebarRouting = [
    {
        name: 'Dashboard',
        href: '/',
        icon: 'newspaper'
    }, {
        name: 'Inbox',
        href: '/inbox',
        icon: 'comments outline'
    }, {
        name: 'Github',
        external: true,
        href: 'https://github.com/Metnew/react-semantic.ui-starter',
        icon: 'github'
    }
]

function getHistory() {
    const basename = process.env.BUILD_GH_PAGES ? '/react-semantic.ui-starter/' : ''
    return useBasename(() => browserHistory)({basename})
}
