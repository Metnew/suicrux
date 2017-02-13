import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    // Button,
    Icon,
    Loader,
    Item,
    Menu,
    Header,
    // Label,
    // Divider,
    Grid,
    Input
} from 'semantic-ui-react'
// import {Link} from 'react-router';

@connect(mapStateToProps, mapDispatchToProps)
export default class Inbox extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        sendStateToParent: React.PropTypes.func
    }

    state = {
        activeItemFilter: 'All'
    }

    handleItemFilterClick(e, {name}) {
        let {sendStateToParent} = this.props;
        this.setState({...this.state, activeItemFilter:name})
        sendStateToParent(this.state)
    }

    render() {
        let {activeItemFilter} = this.state;
        let verticalMenu = {
            vertical: true,
            fluid: true
        }
        if (window.innerWidth < 769) {
            verticalMenu = {}
        }

        return (
            <div>
                <Input fluid icon = {<Icon name = 'search' inverted circular link />} placeholder = 'Search...' />
                <Menu pointing secondary {...verticalMenu}>
                    <Menu.Item name='All' active={activeItemFilter === 'All'} onClick={this.handleItemFilterClick.bind(this)}>
                        All conversations
                    </Menu.Item>

                    <Menu.Item name='notall' active={activeItemFilter === 'notall'} onClick={this.handleItemFilterClick.bind(this)}>
                        notall
                    </Menu.Item>

                    <Menu.Item name='notsoall' active={activeItemFilter === 'notsoall'} onClick={this.handleItemFilterClick.bind(this)}>
                        notsoall
                    </Menu.Item>
                </Menu>
            </div>)
    }
}


function mapStateToProps(state) {
    return {conversations: state.inbox.conversations, isMobile:state.layout.isMobile}
}

function mapDispatchToProps(dispatch) {
    return {
        getConversations: async() => {
            let result = await dispatch(getInbox())
            dispatch(result)
        }
    }
}

//
//
// {
//     Inbox: {
//         "search1": ["hello", "привет", "HALO"],
//         "search2": [null, "привет", "HALO"]
//     }
// }
