import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Loader} from 'semantic-ui-react'

/**
 * @desc small addon that allows you to lazy load some parts of your app
 * Primarly routes (e.g. Route + RouteAuth)
 */
class LazyLoad extends Component {
 static propTypes = {
   component: PropTypes.any
   // NOTE: @Metnew: it'd be nice to make it works with children props!  
   //  children: PropTypes.node
 }

 state = {
   componentLoaded: false,
   componentToRender: null
 }

 componentWillMount () {
   this.load()
 }

 async load () {
   const {component} = this.props
   const componentToRender = await component()
   this.setState({
     componentLoaded: true,
     componentToRender: componentToRender.default
   })
 }

 render () {
   const {componentLoaded} = this.state

   console.log(
     `Component loaded and ready to be mounted: ${componentLoaded
       ? 'YES'
       : 'NO'}`
   )

   if (componentLoaded) {
     const LoadedComponent = this.state.componentToRender
     return <LoadedComponent />
   } else {
     return <Loader>Loading...</Loader>
   }
 }
}

export default LazyLoad
