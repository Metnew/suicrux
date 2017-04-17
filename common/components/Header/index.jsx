import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Icon} from 'semantic-ui-react'
import _ from 'lodash'
import './Header.scss'

export default class Header extends Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps, this.props)
    }

    static propTypes = {
        title: PropTypes.string,
        toggleSidebar: PropTypes.func,
        isLoggedIn: PropTypes.bool
    }

    render() {
        let {title, toggleSidebar, isLoggedIn} = this.props

        return (
            <header>
                <div className="header-inner">
                    {isLoggedIn && <span className="navicon" onClick={toggleSidebar}><Icon name="content"/></span>}
                    <span className="title">
                        {title}
                    </span>
                    <span className="spacer"></span>
                </div>
            </header>
        )
    }
}
