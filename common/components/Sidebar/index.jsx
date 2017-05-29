import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Menu, Sidebar} from 'semantic-ui-react'
import SidebarInnerComponent from './SidebarInnerComponent'
import './Sidebar.scss'

export default class SidebarComponent extends Component {
  static propTypes = {
    open: PropTypes.bool,
    logout: PropTypes.func,
    routing: PropTypes.array,
    isMobile: PropTypes.bool
  }

  render () {
    const {open, logout, routing, isMobile} = this.props

    const sidebarProps = {
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
