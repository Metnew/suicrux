import React, {Component} from 'react'
import {Icon, Button, Popup} from 'semantic-ui-react'
import Logo from 'components/Sidebar/Logo'
import cx from 'classnames'
import './Header.scss'

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        openSidebar: React.PropTypes.func,
        title: React.PropTypes.string,
        toggleSidebar: React.PropTypes.func,
        onHeaderBtnClick: React.PropTypes.func,
        isLoggedIn: React.PropTypes.bool
    }

    render() {
        let {title, toggleSidebar, isLoggedIn, onHeaderBtnClick} = this.props;
        let headerStyles = cx({
            no_sidebar: !isLoggedIn
        })
        return (
            <header className={headerStyles}>
                <div className="header-inner">
                    {!isLoggedIn && <Logo/>}
                    <span className="title">
                        {isLoggedIn && <Icon name='content' onClick={toggleSidebar}/>}
                        {title}
                    </span>
                    <span className="spacer"></span>
                    {isLoggedIn && <Popup trigger={<Button icon onClick={onHeaderBtnClick} basic color = "black"> <Icon name='inbox' size="large"/> </Button>} content="Action with smth."/>}
                </div>
            </header>
        )
    }
}
