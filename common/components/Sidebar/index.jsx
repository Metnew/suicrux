import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Menu, Sidebar} from 'semantic-ui-react'
import SidebarInnerComponent from './SidebarInnerComponent'
import _ from 'lodash'
import './Sidebar.scss'

export default class SidebarComponent extends Component {
  static propTypes = {
    open: PropTypes.bool,
    logout: PropTypes.func,
    routing: PropTypes.array,
    isMobile: PropTypes.bool
  }

  shouldComponentUpdate (nextProps) {
    let {open, isMobile, routing} = this.props
    // re-render on isMobile changed
    if (nextProps.isMobile !== isMobile) {
      return true
    }
    if (nextProps.open !== open) {
      return true
    }
    // maybe routing isn't the same
    return !_.isEqual(nextProps.routing, routing)
  }

  render () {
    const {open, logout, routing, isMobile} = this.props

    let sidebarProps = {
      visible: open || !isMobile,
      as: Menu,
      vertical: true,
      icon: 'labeled',
      animation: 'push',
      width: 'thin'
    }

    let sidebarInnerComponentProps = {
      logout,
      routing
    }

    return (
      <Sidebar {...sidebarProps}>
        <SidebarInnerComponent {...sidebarInnerComponentProps} />
      </Sidebar>
    )
  }
}
