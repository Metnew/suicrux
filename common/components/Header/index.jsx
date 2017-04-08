import React, {Component} from 'react'
import {Icon, Button, Popup} from 'semantic-ui-react'
import './Header.scss'

export default class Header extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        title: React.PropTypes.string,
        toggleSidebar: React.PropTypes.func,
        onHeaderInboxClick: React.PropTypes.func,
        isLoggedIn: React.PropTypes.bool
    }

    render() {
        let {title, toggleSidebar, isLoggedIn, onHeaderInboxClick} = this.props

        return (
            <header>
                <div className="header-inner">
                    <span className="title">
                        {isLoggedIn && <Icon name='content' onClick={toggleSidebar}/>}
                        {title}
                    </span>
                    <span className="spacer"></span>
                    {isLoggedIn && <Popup trigger={<Button icon onClick={onHeaderInboxClick} basic color = "black"> <Icon name='inbox' size="large"/> </Button>} content="Action with smth."/>}
                </div>
            </header>
        )
    }
}
