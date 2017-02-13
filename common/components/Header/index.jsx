import React, {Component} from 'react';
import {Icon, Button, Popup, Image} from 'semantic-ui-react';
import {Link} from 'react-router';
import Logo from 'components/Sidebar/Logo'
import cx from 'classnames';
require('./Header.scss')

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        openSidebar: React.PropTypes.func,
        title: React.PropTypes.string,
        toggleSidebar: React.PropTypes.func,
        onInboxClick: React.PropTypes.func,
        isLoggedIn: React.PropTypes.bool
    }

    render() {
        // onInboxClick
        let {title, toggleSidebar, isLoggedIn, onInboxClick} = this.props;
        let headerStyles = cx({
            no_sidebar: !isLoggedIn
        })
        return (
            <header className={headerStyles}>
                <div className="header-inner">
                    {!isLoggedIn && <Logo />}
                    {isLoggedIn && <Icon name='content' onClick={toggleSidebar}/>}
                    <span className="title">{title}</span>
                    <span className="spacer"></span>
                    {isLoggedIn && <Popup
                        trigger={<Button icon as={Link} to="/inbox" basic color="black">
                            <Icon name='inbox' size="large"/>
                        </Button>}
                        content="Action with smth."
                    />}
                </div>
            </header>
        )
    }
}
