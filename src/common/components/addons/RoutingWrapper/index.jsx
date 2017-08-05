import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Switch, Redirect} from 'react-router-dom'
import {LazyLoad} from 'components/addons'

/**
 * Returns application routing with protected by AuthCheck func routes
 * @desc This function returns JSX, so we can think about it as "stateless component"
 * @param {Function} authCheck checks is user logged in
 */
export default class RoutingWrapper extends Component {
 static propTypes = {
   routes: PropTypes.array,
   authCheck: PropTypes.func
 }

 render () {
   const {routes} = this.props
   const onlyRoutes = routes.filter(
     a => a.tag || a.component || a.lazy || !a.external
   )
   // render components that are inside Switch (main view)
   const routesRendered = onlyRoutes.map((a, i) => {
     // get tag for Route.
     // is it "RouteAuth" `protected route` or "Route"?
     const Tag = a.tag
     const {path, exact, strict, component, lazy} = a
     // can visitor access this route?
     // this function determinates is user allowed to visit route
     const canAccess = this.props.authCheck
     // select only props that we need
     const b = {path, exact, strict, canAccess}

     if (lazy) {
       const routeToRenderLazy = (
         <Tag {...b} key={i}>
           <LazyLoad component={component} />
         </Tag>
       )
       return routeToRenderLazy
     }

     // it can be Route or RouteAuth
     return <Tag key={i} {...b} component={component} />
   })

   return (
     <Switch>
       {routesRendered}
       <Redirect to="/" />
     </Switch>
   )
 }
}
