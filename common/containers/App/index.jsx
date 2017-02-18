import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimmer} from 'semantic-ui-react';
import {Header, Sidebar, Footer} from 'components'
import {CLOSE_SIDEBAR, OPEN_SIDEBAR, WINDOW_RESIZE} from 'actions/layout'; //activateObfuscator, deactivateObfuscator
import {LOGOUT_AUTH} from 'actions/auth'
import {push} from 'react-router-redux'
import cx from 'classnames';
require('./App.scss')

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        children: React.PropTypes.node.isRequired,
        router: React.PropTypes.object,
        sidebarOpened: React.PropTypes.bool,
        obfuscatorActive: React.PropTypes.bool,
        closeSidebar: React.PropTypes.func,
        isLoggedIn: React.PropTypes.bool,
        checkLoggedIn: React.PropTypes.func,
        handleWindowResize: React.PropTypes.func,
        logout: React.PropTypes.func,
        toggleSidebar: React.PropTypes.func,
        onHeaderBtnClick: React.PropTypes.func
    }

    checkAppLoggedIn() {
        let {checkLoggedIn, isLoggedIn, router} = this.props;
        let path = router.getCurrentLocation().pathname;
        // check is user allowed to visit this path
        console.log('checkAppLoggedIn: isLoggedIn + path', isLoggedIn, path, Date.now())
        checkLoggedIn(isLoggedIn, path)
    }

    componentWillMount() {
        let {handleWindowResize} = this.props;
        this.checkAppLoggedIn()
        window.addEventListener('resize', handleWindowResize);
    }

    componentWillReceiveProps() {
        this.checkAppLoggedIn()
    }
    componentDidUpdate() {
        this.checkAppLoggedIn()
    }

    render() {
        let {children, sidebarOpened, closeSidebar, obfuscatorActive, isLoggedIn, logout, onHeaderBtnClick, toggleSidebar} = this.props;
        console.log('isLoggedIn(App)', isLoggedIn)
        let title = children.props.route.name;
        let mainBlockStyles = cx({
            no_sidebar: !isLoggedIn
        })
        return (
            <div className="page-layout">
                {/* component will be rendered only if isLoggedIn === true, so isLoggedIn in sidebar is always true */}
                {isLoggedIn && <Sidebar open={sidebarOpened} isLoggedIn={isLoggedIn} logout={logout} />}
                <Header toggleSidebar={toggleSidebar} onHeaderBtnClick={onHeaderBtnClick} title={title} isLoggedIn={isLoggedIn}/>
                <main className={mainBlockStyles}>
                    <div className="main-content">
                        <div className="ui grid container">
                            {children}
                        </div>
                    </div>
                    <Footer/>
                </main>
                <Dimmer active={obfuscatorActive} onClick={closeSidebar} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        sidebarOpened: state.layout.sidebarOpened,
        obfuscatorActive: state.layout.obfuscatorActive,
        isMobile: state.layout.isMobile,
        isLoggedIn: state.auth.loggedIn
    }
}

function mapDispatchToProps(dispatch) {
    return {
        closeSidebar: () => {
            dispatch(CLOSE_SIDEBAR())
        },
        logout: () => {
            dispatch(LOGOUT_AUTH())
        },
        checkLoggedIn: function(isLoggedIn, path) {
            // allowed pathes to visit
            console.log('check logged in', isLoggedIn, path)
            let authPath = '/auth'
            let homePath = ''
            let allowedWithoutCredentialsPaths = [authPath]
            if (isLoggedIn) {
                // if user is logged in, but is going to visit auth path
                // then push him to homePath
                if (path === authPath) {
                    console.log('redirect from Login to Dashboard')
                    dispatch(push(homePath))
                }
            } else {
                // if user isnt logged in
                console.log('USER ISNT LOGGED IN(APP.checkLoggedIn)')
                // if user is trying to visit not allowed without credentials path
                if (allowedWithoutCredentialsPaths.indexOf(path) === -1) {
                    console.log('redirect to Login')
                    dispatch(push(authPath))
                }
            }
        },
        toggleSidebar: () => {
            dispatch(OPEN_SIDEBAR())
        },
        onHeaderBtnClick: () => {},
        handleWindowResize: () => {
            dispatch(WINDOW_RESIZE())
        }
    }
}
