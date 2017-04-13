import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Icon} from 'semantic-ui-react'
import HeaderRightButton from './HeaderRightButton'
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
        onHeaderRightButtonClick: PropTypes.func,
        isLoggedIn: PropTypes.bool
    }

    render() {
        let {title, toggleSidebar, isLoggedIn, onHeaderRightButtonClick} = this.props

        return (
            <header>
                <div className="header-inner">
                    <span className="title">
                        {isLoggedIn && <Icon name='content' onClick={toggleSidebar}/>}
                        {title}
                    </span>
                    <span className="spacer"></span>
                    {isLoggedIn && <HeaderRightButton onHeaderRightButtonClick={onHeaderRightButtonClick}/>}
                </div>
            </header>
        )
    }
}
