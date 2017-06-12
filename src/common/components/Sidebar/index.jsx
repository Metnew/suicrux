import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import {Menu, Sidebar, Icon, Image} from 'semantic-ui-react'
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

    const routes = routing.map((route, i) => {
      const {external, path, icon, name, strict, exact} = route
      let propsMenuItem = {
        as: external ? 'a' : NavLink,
        link: true,
        [external ? 'href' : 'to']: path
      }

      if (!external) {
        propsMenuItem = {
          ...propsMenuItem,
          strict,
          exact,
          activeClassName: 'active'
        }
      }

      return (
        <Menu.Item key={i} {...propsMenuItem} icon>
          <Icon name={icon} /> {name}
        </Menu.Item>
      )
    })
    // XXX: @Metnew 12.06.2017:
    // it's recommended to create separate Logo component for app
    // But I caught 130# error in production build multiple times (invalid component type)
    // When I've used Logo component (see repo history)
    // I still don't know what was the problem behind it.
    return (
      <Sidebar {...sidebarProps}>
        <div className="logo">
          <Image src="./images/logo.png" centered height="34px" />
        </div>
        {routes}
        <Menu.Item className="logout" onClick={logout}>
          <Icon name="sign out" />
          Logout
        </Menu.Item>
      </Sidebar>
    )
  }
}
