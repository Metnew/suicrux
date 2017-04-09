import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Dimmer, Sidebar as SidebarSemantic, Container} from 'semantic-ui-react'
import {Header, Sidebar, Footer} from 'components'
import {CLOSE_SIDEBAR, OPEN_SIDEBAR, WINDOW_RESIZE} from 'actions/layout'
import {LOGOUT_AUTH} from 'actions/auth'
import {push} from 'react-router-redux'
import {sidebarRouting} from 'routing'
import './App.scss'

class App extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        children: React.PropTypes.node.isRequired,
        location: React.PropTypes.object,
        sidebarOpened: React.PropTypes.bool,
        closeSidebar: React.PropTypes.func,
        isLoggedIn: React.PropTypes.bool,
        checkLoggedIn: React.PropTypes.func,
        handleWindowResize: React.PropTypes.func,
        logout: React.PropTypes.func,
        toggleSidebar: React.PropTypes.func,
        onHeaderInboxClick: React.PropTypes.func,
        router: React.PropTypes.object,
        isMobile: React.PropTypes.bool
    }

    checkAppLoggedIn() {
        let {checkLoggedIn, isLoggedIn, router} = this.props
        let path = router.getCurrentLocation().pathname
        // check is user allowed to visit this path
        checkLoggedIn(isLoggedIn, path)
    }

    componentWillMount() {
        let {handleWindowResize} = this.props
        this.checkAppLoggedIn()
        window.addEventListener('resize', handleWindowResize)
    }

    componentWillReceiveProps() {
        this.checkAppLoggedIn()
    }
    componentDidUpdate() {
        this.checkAppLoggedIn()
    }

    render() {
        let {
            children,
            sidebarOpened,
            closeSidebar,
            isLoggedIn,
            logout,
            onHeaderInboxClick,
            toggleSidebar,
            isMobile
        } = this.props

        let title = children.props.route.name

        let sidebarProps = {
            isMobile,
            logout,
            open: sidebarOpened,
            routing: sidebarRouting
        }

        let headerProps = {
            toggleSidebar,
            title,
            isLoggedIn,
            onHeaderInboxClick
        }

        let dimmerProps = {
            active: sidebarOpened,
            onClick: closeSidebar
        }

        return (
            <div className="page-layout">
                <SidebarSemantic.Pushable>
                    {isLoggedIn && <Sidebar {...sidebarProps}/>}
                    <SidebarSemantic.Pusher>
                        <main>
                            <Header {...headerProps}/>
                            <div className="main-content">
                                <Container>
                                    {children}
                                </Container>
                            </div>
                            <Footer/>
                        </main>
                    </SidebarSemantic.Pusher>
                    <Dimmer {...dimmerProps}/>
                </SidebarSemantic.Pushable>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        sidebarOpened: state.layout.sidebarOpened,
        isMobile: state.layout.isMobile,
        isLoggedIn: state.auth.loggedIn
    }
}

function mapDispatchToProps(dispatch) {
    let resizer
    return {
        closeSidebar: () => {
            dispatch(CLOSE_SIDEBAR())
        },
        logout: () => {
            dispatch(LOGOUT_AUTH())
        },
        checkLoggedIn: function(isLoggedIn, path) {
            // allowed pathes to visit
            let authPath = '/auth'
            let homePath = ''
            let allowedWithoutCredentialsPaths = [authPath]
            if (isLoggedIn) {
                // if user is logged in, but is going to visit auth path
                // then push him to homePath
                if (path === authPath) {
                    dispatch(push(homePath))
                }
            } else {
                // if user isnt logged in
                // if user is trying to visit not allowed without credentials path
                if (allowedWithoutCredentialsPaths.indexOf(path) === -1) {
                    dispatch(push(authPath))
                }
            }
        },
        toggleSidebar: () => {
            dispatch(OPEN_SIDEBAR())
        },
        onHeaderInboxClick: () => {},
        handleWindowResize: () => {
            clearTimeout(resizer)
            resizer = setTimeout((() => dispatch(WINDOW_RESIZE())), 100)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
