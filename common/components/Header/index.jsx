import React, {Component} from 'react'
import {Icon} from 'semantic-ui-react'
import './Header.scss'
import HeaderRightButton from './HeaderRightButton'

export default class Header extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        title: React.PropTypes.string,
        toggleSidebar: React.PropTypes.func,
        onHeaderRightButtonClick: React.PropTypes.func,
        isLoggedIn: React.PropTypes.bool
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
