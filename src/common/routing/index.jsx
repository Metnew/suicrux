import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import {App, Users, Dashboard, Login} from 'containers'
import {RouteAuth} from 'components'
import {createBrowserHistory, createMemoryHistory} from 'history'

export const history = getHistory()

const loadLazyComponent = url => {
  return async cb => {
    const loadComponent = await import(/* webpackMode: "lazy-once", webpackChunkName: "lazy-containers" */ `containers/${url}/index.jsx`)
    return loadComponent
  }
}

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
    path: '/users',
    name: 'Users',
    exact: true,
    icon: 'users',
    sidebarVisible: true,
    tag: RouteAuth,
    component: Users
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
  },
  {
    path: '/users/:id',
    name: 'User',
    lazy: true,
    exact: true,
    strict: true,
    tag: RouteAuth,
    component: loadLazyComponent('UsersItem')
  }
]

/**
 * Returns application routing with protected by AuthCheck func routes
 * @param {Function} authCheck checks is user logged in
 */
export const Routing = authCheck => {
  // remove components that aren't application routes, (e.g. github link in sidebar)
  const routes = appRouting.filter(
    a => a.tag || a.component || a.lazy || !a.external
  )
  // render components that are inside Switch (main view)
  const routesRendered = routes.map((a, i) => {
    // get tag for Route.
    // is it "RouteAuth" `protected route` or "Route"?
    const Tag = a.tag
    const {path, exact, strict, component, lazy} = a
    // can visitor access this route?
    const canAccess = authCheck
    // select only props that we need
    const b = {path, exact, strict, component, canAccess, lazy}

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
  if (process.env.BABEL_ENV === 'ssr') {
    return createMemoryHistory()
  }
  return createBrowserHistory({basename})
}
