import React from 'react';
import {Route, Redirect, Switch} from 'react-router';
import {createBrowserHistory} from 'history'
import {App, Inbox, Dashboard, Login} from 'containers';

export const history = getHistory()

/**
 * Returns application routing with protected by AuthCheck func routes
 * @param {Function} AuthCheck checks is user logged in
 */
export const Routing = (AuthCheck) => {
    let routes = [
        {
            name: 'Login',
            path: '/auth',
            tag: Route,
            component: Login
        }, {
            name: 'Dashboard',
            path: '/',
            tag: Route,
            component: Dashboard,
            exact: true
        }, {
            name: 'Inbox',
            path: '/inbox',
            tag: Route,
            component: Inbox
        }
    ]

    let rot = routes
    // .filter((a) => {
    //     return AuthCheck(a.path)
    // })
        .map((a) => {
        let Tag = a.tag
        delete a.tag
        return (<Tag key={Math.random()} {...a}/>)
    })

    return (
        <App>
            <Switch>
                {rot}
                <Redirect from="*" to="/"/>
            </Switch>
        </App>
    )
}

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
    const basename = process.env.BUILD_DEMO
        ? '/react-semantic.ui-starter'
        : ''

    return createBrowserHistory({basename})
}
