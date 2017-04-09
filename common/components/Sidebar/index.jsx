import React, {Component} from 'react';
import {Menu, Sidebar} from 'semantic-ui-react'
import './Sidebar.scss'
import SidebarInnerComponent from './SidebarInnerComponent'

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
