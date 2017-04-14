import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Menu, Icon} from 'semantic-ui-react'
import Logo from './Logo'
import './Sidebar.scss'

export default class SidebarInnerComponent extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        logout: PropTypes.func,
        routing: PropTypes.array
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        const {logout, routing} = this.props

        let routes = routing.map((route, i) => {
            let {external, href, icon, name} = route
            let propsMenuItem = {
                as: external ? 'a' : Link,
                link: true,
                key: i,
                [external ? 'href' : 'to']: href
            }

            return (
                <Menu.Item {...propsMenuItem} icon>
                    <Icon name={icon}/> {name}
                </Menu.Item>
            )
        })



        return (
            <div>
                <Logo centered/>
                {routes}
                <Menu.Item className="logout" onClick={logout}>
                    <Icon name='sign out'/>
                    Logout
                </Menu.Item>
            </div>
        )
    }
}
