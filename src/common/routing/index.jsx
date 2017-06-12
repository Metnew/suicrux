import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import {App, Inbox, Dashboard, Login} from 'containers'
import {RouteAuth} from 'components'

export const history = getHistory()

export const appRouting = [
  {
    path: '/',
    icon: 'newspaper',
    name: 'Dashboard',
    exact: true,
    sidebarVisible: true,
    tag: RouteAuth,
    component: Dashboard
  },
  {
    path: '/inbox',
    name: 'Inbox',
    exact: true,
    icon: 'comments outline',
    sidebarVisible: true,
    tag: RouteAuth,
    component: Inbox
  },
  {
    external: true,
    path: 'https://github.com/Metnew/react-semantic.ui-starter',
    icon: 'github',
    name: 'Github',
    sidebarVisible: true
  },
  {
    path: '/auth',
    name: 'Auth',
    tag: Route,
    component: Login
  }
]

/**
 * Returns application routing with protected by AuthCheck func routes
 * @param {Function} authCheck checks is user logged in
 */
export const Routing = authCheck => {
  // remove components that aren't application routes, (e.g. github link in sidebar)
  const routes = appRouting.filter(a => a.tag || a.component)
  // render components that are inside Switch (main view)
  const routesRendered = routes.map((a, i) => {
    // get tag for Route. is it RouteAuth `protected route` or Route?
    const Tag = a.tag
    const {path, exact, strict, component} = a
    // can visitor access this route?
    const canAccess = authCheck
    // select only props that we need
    const b = {path, exact, strict, component, canAccess}

    return <Tag key={i} {...b} />
  })

  return (
    <App>
      <Switch>
        {routesRendered}
        <Redirect to="/" />
      </Switch>
    </App>
  )
}

function getHistory () {
  const basename = process.env.BUILD_DEMO ? '/react-semantic.ui-starter' : ''
  return createBrowserHistory({basename})
}
