import React, {Component} from 'react';
import {Link} from 'react-router'
import {Menu, Icon, Sidebar} from 'semantic-ui-react'
import Logo from './Logo'
import './Sidebar.scss'

export default class SidebarComponent extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        open: React.PropTypes.bool,
        logout: React.PropTypes.func,
        routing: React.PropTypes.array,
        isMobile: React.PropTypes.bool
    }

    render() {
        const {
            open,
            logout,
            routing,
            isMobile
        } = this.props

        let routes = routing.map((route, i) =>
            <Menu.Item as={Link} key={i} link={true} to={route.href} icon>
                <Icon name={route.icon} />
                {route.name}
            </Menu.Item>
        )

        let sidebarProps = {
            visible: open || !isMobile,
            as: Menu,
            vertical: true,
            icon: 'labeled',
            animation: 'push',
            width: 'thin'
        }

        return (
            <Sidebar {...sidebarProps}>
                <Logo centered/>
                {routes}
                <Menu.Item className="logout" onClick={logout}>
                    <Icon name='sign out' />
                    Logout
                </Menu.Item>
            </Sidebar>
        )
    }
}
